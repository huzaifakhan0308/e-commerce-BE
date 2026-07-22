import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type VouchersDocument = Vouchers & Document;

@Schema({ timestamps: true })
export class Vouchers {
  @Prop({ required: true })
  imageUrl: string;
}

export const VouchersSchema = SchemaFactory.createForClass(Vouchers);