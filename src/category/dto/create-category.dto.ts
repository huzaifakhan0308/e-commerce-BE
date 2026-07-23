import { IsOptional, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCategoryDto {
  @IsOptional()
  @Type(() => Number)
  
  @IsNumber()
  durationHours?: number;
}