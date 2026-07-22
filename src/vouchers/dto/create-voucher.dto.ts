import { IsString, IsNumber, IsArray, IsOptional } from 'class-validator';

export class CreateVoucherDto {
  @IsString()
  imageUrl: string;
}

