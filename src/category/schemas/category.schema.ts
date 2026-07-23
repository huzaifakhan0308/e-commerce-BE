import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema({ timestamps: true })
export class Category {
  @Prop()
  image: string;

  @Prop()
  imageType: string;

  @Prop({ required: true })
  expiresAt: Date;
}

export const CategorySchema = SchemaFactory.createForClass(Category);

CategorySchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });