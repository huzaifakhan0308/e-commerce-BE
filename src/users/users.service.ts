import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users, UsersDocument } from './schemas/users.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UpdateProfileDto } from './dto/updateProfile.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private userModel: Model<UsersDocument>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Users> {
    const created = new this.userModel(createUserDto);
    return created.save();
  }

  async findAll(): Promise<Users[]> {
    return this.userModel.find().select('-password').exec();
  }

  async findOne(id: string): Promise<Users> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<Users> {
    const updated = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
    if (!updated) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return updated;
  }

async updateProfile(userId: string, dto: UpdateProfileDto) {
  const user = await this.userModel.findById(userId);
  if (!user) {
    throw new BadRequestException('User not found');
  }

  if (dto.newPassword) {
    if (!dto.currentPassword) {
      throw new BadRequestException('Current password is required to set a new password');
    }
    const matches = await bcrypt.compare(dto.currentPassword, user.password);
    if (!matches) {
      throw new UnauthorizedException('Current password is incorrect');
    }
    user.password = await bcrypt.hash(dto.newPassword, 10);
  }

  if (dto.firstName !== undefined) user.firstName = dto.firstName;
  if (dto.lastName !== undefined) user.lastName = dto.lastName;
  if (dto.email !== undefined) user.email = dto.email;
  if (dto.address !== undefined) user.address = dto.address;

  await user.save();

  const { password, ...safeUser } = user.toObject();
  return safeUser;
}

  async remove(id: string): Promise<Users> {
    const deleted = await this.userModel.findByIdAndDelete(id).exec();
    if (!deleted) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return deleted;
  }
}