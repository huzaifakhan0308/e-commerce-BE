import { IsString, IsNumber, IsArray, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  firstName: string;
  
  @IsOptional()
  @IsString()
  lastName: string;
  
  @IsString()
  email: string;
  
  @IsOptional()
  @IsString()
  address: string;
  
  @IsString()
  password: string;

}

