import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './schemas/order.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private orderModel: Model<OrderDocument>) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const created = new this.orderModel(createOrderDto);
    return created.save();
  }

  async findAll(): Promise<Order[]> {
    return this.orderModel.find().sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string): Promise<Order> {
    const order = await this.orderModel.findById(id).exec();
    if (!order) throw new NotFoundException(`Order with id ${id} not found`);
    return order;
  }

  async updateStatus(id: string, dto: UpdateOrderStatusDto): Promise<Order> {
    const updated = await this.orderModel
      .findByIdAndUpdate(id, { status: dto.status }, { new: true })
      .exec();
    if (!updated) throw new NotFoundException(`Order with id ${id} not found`);
    return updated;
  }

  async remove(id: string): Promise<Order> {
    const deleted = await this.orderModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException(`Order with id ${id} not found`);
    return deleted;
  }

  async getStats() {
    const orders = await this.orderModel.find().exec();

    const totalOrders = orders.length;
    const totalRevenue = orders
      .filter((o) => o.status !== 'cancelled')
      .reduce((sum, o) => sum + o.total, 0);

    const byStatus = orders.reduce((acc, o) => {
      acc[o.status] = (acc[o.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return { totalOrders, totalRevenue, byStatus };
  }
}