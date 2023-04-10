import { Injectable } from '@nestjs/common';

import { v4 } from 'uuid';

import { Cart as LegacyCart, CartItem as LegacyCartItem } from '../models';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

    return this.cartRepository.save(cart);
  }

  async findOrCreateByUserId(userId: string): Promise<Cart> {
    const userCart = await this.findByUserId(userId);

    if (userCart) {
      return userCart;
    }

    return this.createByUserId(userId);
  }

  async updateByUserId(
    userId: string,
    items: LegacyCartItem,
  ): Promise<LegacyCart> {



    const { id, ...rest } = await this.findOrCreateByUserId(userId);
    const cart = await this.findOrCreateByUserId(userId);
    console.log('cart', cart);

    let cartItem = cart.items.find(record => record.productId === items.product.id);
    if(cartItem){
      cartItem.count += items.count
      console.log(cartItem);
    }
    else {
      cartItem = new CartItem();
      cartItem.cartId = cart.id;
      cartItem.productId = items.product.id;
      cartItem.count = items.count
    }

    const updatedCart = {
      ...cart,
      items: [...cart.items, cartItem],
    };
    const cartResponse = await this.cartRepository.save(updatedCart);
    console.log('cartResponse', cartResponse);

    const updatedItems = await this.cartItemRepository.find({
      where: { cartId: id },
      relations: ['product'],
    });

    console.log(updatedItems);

    return cartResponse;
  }

  removeByUserId(userId): void {
    this.userCarts[userId] = null;
  }
}
