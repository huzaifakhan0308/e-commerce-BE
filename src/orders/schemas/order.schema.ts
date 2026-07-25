import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrderDocument = Order & Document;

export class OrderItem {
  @Prop({ required: true })
  productId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  quantity: number;

  @Prop()
  color: string;

  @Prop()
  size: string;
}

@Schema({ timestamps: true })
export class Order {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  userEmail: string;

  @Prop({ type: [Object], required: true })
  items: OrderItem[];

  @Prop({ required: true })
  total: number;

  @Prop({
    default: 'pending',
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
  })
  status: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);