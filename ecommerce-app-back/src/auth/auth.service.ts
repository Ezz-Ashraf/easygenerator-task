import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { UserSchema } from '../schemas/user.schema';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signup(dto: SignupDto): Promise<{ token: string }> {
    const existing = await this.userModel.findOne({ email: dto.email });
    if (existing) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = await this.userModel.create({
      email: dto.email,
      name:dto.name,
      password: hashedPassword,
    });

    return this.generateToken(user);
  }

  async login(dto: LoginDto): Promise<{ token: string }> {
    const user = await this.userModel.findOne({ email: dto.email });
    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.generateToken(user);
  }

  private generateToken(user: User): { token: string } {
    const payload = { sub: user._id, email: user.email };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
