import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Vouchers, VouchersDocument } from './schemas/vouchers.schema';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { UpdateVoucherDto } from './dto/update-voucher.dto';

@Injectable()
export class VouchersService {
  constructor(
    @InjectModel(Vouchers.name) private voucherModel: Model<VouchersDocument>,
  ) {}

  async create(createVoucherDto: CreateVoucherDto, file?: Express.Multer.File): Promise<Vouchers> {
    const voucherData: any = {}
    if (file) {
    voucherData.image = file.buffer.toString('base64');
    voucherData.imageType = file.mimetype;
  }
  const finalVoucherData = {...createVoucherDto, ...voucherData};
    const created = new this.voucherModel(finalVoucherData);
    return created.save();
  }

  async findAll(): Promise<Vouchers[]> {
    return this.voucherModel.find().exec();
  }

  async findOne(id: string): Promise<Vouchers> {
    const voucher = await this.voucherModel.findById(id).exec();
    if (!voucher) {
      throw new NotFoundException(`Voucher with id ${id} not found`);
    }
    return voucher;
  }

  async update(id: string, updateVoucherDto: UpdateVoucherDto): Promise<Vouchers> {
    const updated = await this.voucherModel
      .findByIdAndUpdate(id, updateVoucherDto, { new: true })
      .exec();
    if (!updated) {
      throw new NotFoundException(`Voucher with id ${id} not found`);
    }
    return updated;
  }

  async remove(id: string): Promise<Vouchers> {
    const deleted = await this.voucherModel.findByIdAndDelete(id).exec();
    if (!deleted) {
      throw new NotFoundException(`Voucher with id ${id} not found`);
    }
    return deleted;
  }
}