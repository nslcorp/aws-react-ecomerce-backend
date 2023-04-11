import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderService {

  create(createOrderNextDto: any) {
    return 'This action adds a new orderNext';
  }

  findAll() {
    return `This action returns all orderNext`;
  }

  findOne(id: number) {
    return `This action returns a #${id} orderNext`;
  }

  update(id: number, updateOrderNextDto: any) {
    return `This action updates a #${id} orderNext`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderNext`;
  }
}
