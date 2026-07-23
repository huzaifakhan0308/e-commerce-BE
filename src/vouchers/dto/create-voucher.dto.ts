import { IsString, IsNumber, IsArray, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateVoucherDto {
  @IsOptional()
  @Type(() => Number)

  @IsString()
  imageUrl: string;
}

