import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Users, UsersDocument } from '../users/schemas/users.schema';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Users.name) private userModel: Model<UsersDocument>,
    private jwtService: JwtService,
  ) {}

  async signup(signupDto: SignupDto) {
    const existingUser = await this.userModel.findOne({ email: signupDto.email });
    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(signupDto.password, 10);

    const created = new this.userModel({
    firstName: signupDto.firstName,
    lastName: signupDto.lastName,
    email: signupDto.email,
    address: signupDto.address,
    password: hashedPassword,
  });
    const saved = await created.save();

    const { password, ...userWithoutPassword } = saved.toObject();
    return userWithoutPassword;
  }

  async login(loginDto: LoginDto) {
    const user = await this.userModel.findOne({ email: loginDto.email });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatches = await bcrypt.compare(loginDto.password, user.password);
    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid credentials');
    }

   const token = this.jwtService.sign({
  sub: user._id,
  email: user.email,
  role: user.role,
});

    return { access_token: token, role: user.role };
  }
}