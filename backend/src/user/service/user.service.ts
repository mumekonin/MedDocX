import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from '../schema/user.schema';
import { RegisterUserDto, LoginDto, UpdateProfileDto, ChangePasswordDto } from '../dto/user.dto';
import { UserResponse } from '../response/user.response';
import { CommonUtils } from './../../common/utils/utils';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async registerUser(registerUserDto: RegisterUserDto): Promise<UserResponse> {
    const existingUser = await this.userModel.findOne({ email: registerUserDto.email });
    if (existingUser) {
      throw new BadRequestException('user already exists with this email');
    }
    const hashedPassword = await bcrypt.hash(registerUserDto.password, 10);
    const newUser = new this.userModel({
      name: registerUserDto.name,
      email: registerUserDto.email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    return {
      id: savedUser._id.toString(),
      name: savedUser.name,
      email: savedUser.email,
    };
  }

  async userLogin(loginDto: LoginDto): Promise<{ token: string }> {
    const user = await this.userModel.findOne({ email: loginDto.email }).select('+password');
    if (!user) {
      throw new BadRequestException('invalid email ');
    }
    const isPwdMatch = await bcrypt.compare(loginDto.password, user.password);
    if (!isPwdMatch) {
      throw new BadRequestException('incorrect password provided');
    }
    const jwtData = {
      id: user._id.toString(),
      email: user.email,
    };
    const token = CommonUtils.generateJwtToken(jwtData);
    return { token };
  }

  async getProfile(userId: string): Promise<UserResponse> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new BadRequestException('user not found');
    }
    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      isActive: user.isActive,
    };
  }

  async updateProfile(userId: string, updateProfileDto: UpdateProfileDto): Promise<UserResponse> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new BadRequestException('user not found');
    }
    if (updateProfileDto.email) {
      user.email = updateProfileDto.email;
    }
    if (updateProfileDto.name) {
      user.name = updateProfileDto.name;
    }
    const updatedUser = await user.save();
    return {
      id: updatedUser._id.toString(),
      name: updatedUser.name,
      email: updatedUser.email,
      isActive: updatedUser.isActive,
    };
  }

  async changePassword(
    userId: string,
    changePasswordDto: ChangePasswordDto,
  ): Promise<{ message: string }> {
    const user = await this.userModel.findById(userId).select('+password');
    if (!user) {
      throw new BadRequestException('user not found');
    }
    const isPwdMatch = await bcrypt.compare(changePasswordDto.currentPassword, user.password);
    if (!isPwdMatch) {
      throw new BadRequestException('current password is incorrect');
    }
    const hashedPassword = await bcrypt.hash(changePasswordDto.newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    return { message: 'password updated successfully' };
  }
}
