import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VouchersService } from './vouchers.service';
import { VouchersController } from './vouchers.controller';
import { Vouchers, VouchersSchema } from './schemas/vouchers.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Vouchers.name, schema: VouchersSchema }]),
  ],
  controllers: [VouchersController],
  providers: [VouchersService],
})
export class VouchersModule {}