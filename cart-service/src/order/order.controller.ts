import {
  Controller,
  Get,
  Delete,
  Put,
  Body,
  Req,
  UseGuards,
  HttpStatus,
  Param,
  HttpException,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { BasicAuthGuard } from '../auth';
import { AppRequest, getUserIdFromRequest } from '../shared';
import { OrderPayload } from './order.models';
import { CartService } from '../cart';

@Controller('api/profile/order')
export class OrderController {
  constructor(
    private orderService: OrderService,
    private cartService: CartService,
  ) {}

  @UseGuards(BasicAuthGuard)
  @Put()
  async create(@Req() req: AppRequest, @Body() body) {
    const userId = getUserIdFromRequest(req);
    const { address } = body as OrderPayload;

    if (!address) {
      throw new HttpException(
        'Validation Error. Expected request: { body: {address : {...} }',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const userCart = await this.cartService.findByUserId(userId);
    if (!userCart) {
      throw new HttpException(
        `Cart for user: ${userId} is not exist. Check that there is cart, then process the order.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const order = await this.orderService.findOneByUserId(userId);
    console.log('create::findOrder [order, userId]', order, userId);
    if (order) {
      return {
        statusCode: 400,
        message: `Order #${order.id} created by User ${userId} already exist. We can not perform Create operation, because we don't have business rules how it should be replaced and(or) update.`,
      };
    }

    try {
      const orderResponse = await this.orderService.create(
        userId,
        userCart.id,
        body,
      );
      console.log('create::orderResponse', orderResponse);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(BasicAuthGuard)
  @Delete(':id')
  async remove(@Param('id') orderID: string) {
    try {
      const order = await this.orderService.findOneByOrderID(orderID);
      if (!order) {
        throw new Error(`Order with id: ${orderID} does not exist.`);
      }

      return await this.orderService.remove(orderID);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(BasicAuthGuard)
  @Get()
  async findAll() {
    try {
      return await this.orderService.findAll();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
