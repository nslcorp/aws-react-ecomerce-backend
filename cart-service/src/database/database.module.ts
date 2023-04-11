import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-snake-naming-strategy';
import { Cart } from './entities/cart.entity';
import { CartItem } from './entities/cart-item.entity';
import { User } from './entities/user.entity';
import { Product } from "./entities/product.entity";
import { Order } from "./entities/order.entity";


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: ['dist/database/entities/*.entity{.ts,.js}'],
      logging: false,
      namingStrategy: new SnakeNamingStrategy(),
    }),
    TypeOrmModule.forFeature([Cart, CartItem, User, Product, Order]),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
