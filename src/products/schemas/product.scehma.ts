import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  discountPrice: number;

  @Prop({ type: [String] })
  imageUrls: string[];

  @Prop({ type: [String] })
  colors: string[];

  @Prop({ type: [String] })
  sizes: string[];

}

export const ProductSchema = SchemaFactory.createForClass(Product);