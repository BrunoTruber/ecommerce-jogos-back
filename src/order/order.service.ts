/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './order.entity';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderRepository)
    private orderRepository: OrderRepository,
  ) {}

  async find(): Promise<Order[]> {
    return this.orderRepository.find();
  }

  async postOrder(createOrderDto: CreateOrderDto) {
    const newOrder = await this.orderRepository.create({
      ...createOrderDto,
    });
    await this.orderRepository.save(newOrder);
    return newOrder;
  }

  async updateOrder(id: string, updateOrder: CreateOrderDto): Promise<Order> {
    await this.orderRepository.update(id, updateOrder);
    const updatedCategory = await this.orderRepository.findOne(id, {
      relations: ['games']['user'],
    });
    if (updatedCategory) {
      return updatedCategory;
    }
    throw new NotFoundException(id);
  }
}
