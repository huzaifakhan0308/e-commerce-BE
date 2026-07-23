import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductsDocument = Products & Document;

@Schema({ timestamps: true })
export class Products {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ default: null })
  discountPrice: number;

  @Prop({
    type: [{ image: String, imageType: String }],
    default: [],
  })
  images: { image: string; imageType: string }[];

  @Prop({ type: [String] })
  colors: string[];

  @Prop({ type: [String] })
  sizes: string[];

}

export const ProductsSchema = SchemaFactory.createForClass(Products);