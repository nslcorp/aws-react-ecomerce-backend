import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { DatabaseModule } from '../database/database.module';
import { CartService } from '../cart';

@Module({
  imports: [DatabaseModule],
  providers: [OrderService, CartService],
  controllers: [OrderController],
})
export class OrderModule {}
