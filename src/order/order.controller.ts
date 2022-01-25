/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderService } from './order.service';

@ApiTags('order')
@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post('/create')
  @UsePipes(ValidationPipe)
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.postOrder(createOrderDto);
  }

  @Get()
  findAll() {
    return this.orderService.find();
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateOrder: CreateOrderDto) {
    return this.orderService.updateOrder(id, updateOrder);
  }
}
