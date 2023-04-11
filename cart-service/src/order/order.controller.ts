import { Controller, Get, Delete, Put, Body, Req, UseGuards, HttpStatus, Post, Param } from "@nestjs/common";
import { OrderService } from "./order.service";

@Controller('api/profile/order')
export class OrderController {
  constructor(
    // private cartService: CartService,
    private orderService: OrderService
  ) { }

  @Post()
  create(@Body() createOrderNextDto: any) {
    return this.orderService.create(createOrderNextDto);
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateOrderNextDto: any) {
    return this.orderService.update(+id, updateOrderNextDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
