import { Injectable } from '@nestjs/common';
import { OrderPayload } from './order.models';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../database/entities/order.entity';
import { Repository } from 'typeorm';
import { CartStatus } from '../database/entities/cart.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async create(userId: string, cartId: string, orderPayload: OrderPayload) {
    const order = new Order();
    order.userId = userId;
    order.cartId = cartId;
    order.payment = { creditCard: '1234-5678' };
    order.delivery = orderPayload.address;
    order.comments = orderPayload.address.comment;
    order.total = orderPayload.total;
    order.status = CartStatus.ORDERED;

    const createOrderResponse = await this.orderRepository.save(order);
    console.log('createOrderResponse', createOrderResponse);
    return createOrderResponse;
  }

  async findAll() {
    return await this.orderRepository.find({ relations: ['items'] });
  }

  async findOneByUserId(userId: string) {
    return await this.orderRepository.findOne({ userId });
  }
  async findOneByOrderID(orderID: string) {
    return await this.orderRepository.findOne({ id: orderID });
  }

  async remove(id: string) {
    return await this.orderRepository.delete({ id });
  }
}
