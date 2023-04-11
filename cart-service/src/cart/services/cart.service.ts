import { Injectable } from '@nestjs/common';

import { v4 } from 'uuid';

import { Cart as LegacyCart, CartItem as LegacyCartItem } from '../models';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Cart, CartStatus } from '../../database/entities/cart.entity';
import { CartItem } from '../../database/entities/cart-item.entity';
import { Product } from '../../database/entities/product.entity';

@Injectable()
export class CartService {
  private userCarts: Record<string, LegacyCart> = {};

  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findByUserId(userId: string): Promise<Cart> {
    return await this.cartRepository.findOne(
      { userId },
      { relations: ['items', 'items.product'] },
    );
  }

  createByUserId(userId: string) {
    const cart = new Cart();
    cart.userId = userId;
    cart.createdAt = new Date();
    cart.updatedAt = new Date();
    cart.status = CartStatus.OPEN;
    cart.items = [];

    return this.cartRepository.save(cart);
  }

  async findOrCreateByUserId(userId: string): Promise<Cart> {
    const userCart = await this.findByUserId(userId);

    if (userCart) {
      return userCart;
    }

    return this.createByUserId(userId);
  }

  async updateByUserId(userId: string, item: LegacyCartItem): Promise<any> {
    const { id, ...rest } = await this.findOrCreateByUserId(userId);
    const cart = await this.findOrCreateByUserId(userId);
    console.log('cart', cart);

    let cartItem = cart.items.find(
      (record) => record.productId === item.product.id,
    );
    if (cartItem) {
      if (item.count === 0) {
        await this.cartItemRepository.remove(cartItem);
      }

      cartItem.count += item.count;
      await this.cartItemRepository.save(cartItem);
    } else {
      const product = new Product();
      product.id = item.product.id;
      product.title = item.product.title;
      product.description = item.product.description;
      product.price = item.product.price;
      await this.productRepository.save(product);

      cartItem = new CartItem();
      cartItem.cartId = cart.id;
      cartItem.productId = item.product.id;
      cartItem.count = item.count;
      cartItem.product = product;

      await this.cartItemRepository.save(cartItem);
    }

    const updatedItems = await this.cartItemRepository.find({
      where: { cartId: id },
      relations: ['product'],
    });

    return updatedItems;
  }

  async removeByUserId(userId): Promise<void> {
    const cart = await this.cartRepository.findOne({ userId });
    const cartItem = await this.cartItemRepository.find({ cartId: cart.id });
    const productIDs = cartItem.map((record) => record.productId);

    const pResponse = await this.productRepository.delete({
      id: In(productIDs),
    });
    console.log(pResponse);

    const ciResponse = await this.cartItemRepository.delete({ cart });
    console.log(ciResponse);
    const cartDeleteResult = await this.cartRepository.delete({ userId });
    console.log(cartDeleteResult);
  }
}
