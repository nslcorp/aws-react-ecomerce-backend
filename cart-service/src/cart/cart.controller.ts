import {
  Controller,
  Get,
  Delete,
  Put,
  Body,
  Req,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { AppRequest, getUserIdFromRequest } from '../shared';
import { CartService } from './services';
import { BasicAuthGuard } from '../auth';

@Controller('api/profile/cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @UseGuards(BasicAuthGuard)
  @Get()
  async findUserCart(@Req() req: AppRequest) {
    const userID = getUserIdFromRequest(req);
    const cart = await this.cartService.findOrCreateByUserId(userID);
    console.log('GET::findUserCart::cart', cart);

    return cart.items;
  }

  @UseGuards(BasicAuthGuard)
  @Put()
  async updateUserCart(@Req() req: AppRequest, @Body() body) {
    // TODO: change to better validation ...
    const { product, count } = body;
    if (typeof count !== 'number' || !product) {
      return {
        statusCode: 400,
        message: 'Validation Error',
      };
    }

    const userID = getUserIdFromRequest(req);
    const cart = await this.cartService.updateByUserId(userID, body);

    return cart;
  }

  @UseGuards(BasicAuthGuard)
  @Delete()
  async clearUserCart(@Req() req: AppRequest) {
    const userID = getUserIdFromRequest(req);
    console.log('Delete', userID);
    await this.cartService.removeByUserId(userID);

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
    };
  }

  // @UseGuards(BasicAuthGuard)
  // @Post('checkout')
  // async checkout(@Req() req: AppRequest, @Body() body) {
  //   const userId = getUserIdFromRequest(req);
  //   const cart = await this.cartService.findByUserId(userId);
  //
  //   if (!(cart && cart.items.length)) {
  //     const statusCode = HttpStatus.BAD_REQUEST;
  //     req.statusCode = statusCode
  //
  //     return {
  //       statusCode,
  //       message: 'Cart is empty',
  //     }
  //   }
  //
  //   const { id: cartId, items } = cart;
  //   const total = calculateCartTotal(cart);
  //   const order = this.orderService.create({
  //     ...body, // TODO: validate and pick only necessary data
  //     userId,
  //     cartId,
  //     items,
  //     total,
  //   });
  //   await this.cartService.removeByUserId(userId);
  //
  //   return {
  //     statusCode: HttpStatus.OK,
  //     message: 'OK',
  //     data: { order }
  //   }
  // }
}
