import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { SignUpDto } from './dto/sign-up.dto';
import { User } from 'src/user/schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
const SALT = 10;
@Injectable()
export class AuthService {

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService
  ) {
  }
  async create(signupDto: SignUpDto) {
    const { email, name, password } = signupDto;
    const hashedPassword = await bcrypt.hash(password, SALT);
    const user = new this.userModel({ email, name, password: hashedPassword });
    const savedUser = await user.save();
    const payload = {
      _id: savedUser._id,
      name: savedUser.name,
      email: savedUser.email,
    }
    const accessToken = await this.jwtService.signAsync(payload);
    return { user: savedUser, accessToken };
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
