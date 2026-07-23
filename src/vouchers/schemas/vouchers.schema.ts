import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type VouchersDocument = Vouchers & Document;

@Schema({ timestamps: true })
export class Vouchers {
  @Prop()
  image: string;

  @Prop()
  imageType: string;
}

export const VouchersSchema = SchemaFactory.createForClass(Vouchers);