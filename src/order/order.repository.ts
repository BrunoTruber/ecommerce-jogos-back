import { EntityRepository, Repository } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './order.entity';

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {
  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const { user, games } = createOrderDto;

    const order = this.create();

    // order.user = order;
    // user.games = games;

    try {
      await order.save();
      return order;
    } catch (error) {
      throw new InternalServerErrorException('Error creating order');
    }
  }
}
