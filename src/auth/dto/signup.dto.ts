import { IsString, IsOptional, IsEmail, MinLength } from 'class-validator';

export class SignupDto {
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  address: string;

  @MinLength(6)
  password: string;
}