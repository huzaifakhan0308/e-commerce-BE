import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Products, ProductsDocument } from './schemas/products.schemas';
import { CreateProductsDto } from './dto/create-products.dto';
import { UpdateProductsDto } from './dto/update-products.dto'; 

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Products.name) private productsModel: Model<ProductsDocument>,
  ) {}

  async create(createProductDto: CreateProductsDto, files?: Express.Multer.File[]): Promise<Products> {
  const productData: any = { ...createProductDto };

  if (files && files.length > 0) {
    productData.images = files.map((file) => ({
      image: file.buffer.toString('base64'),
      imageType: file.mimetype,
    }));
  }

  const created = new this.productsModel(productData);
  return created.save();
}

  // async findAll(): Promise<Products[]> {
  //   return this.productsModel.find().exec();
  // }

  async findOne(id: string): Promise<Products> {
    const products = await this.productsModel.findById(id).exec();
    if (!products) {
      throw new NotFoundException(`Products with id ${id} not found`);
    }
    return products;
  }

  async update(id: string, updateProductsDto: UpdateProductsDto): Promise<Products> {
    const updated = await this.productsModel
      .findByIdAndUpdate(id, updateProductsDto, { new: true })
      .exec();
    if (!updated) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return updated;
  }

  async remove(id: string): Promise<Products> {
    const deleted = await this.productsModel.findByIdAndDelete(id).exec();
    if (!deleted) {
      throw new NotFoundException(`Products with id ${id} not found`);
    }
    return deleted;
  }
}