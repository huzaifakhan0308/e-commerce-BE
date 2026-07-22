import { IsString, IsNumber, IsArray, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsNumber()
  discountPrice: number;

  @IsString()
  imageUrls: string[];

  @IsArray()
  colors: string[];

  @IsArray()
  sizes: string[];
}
