import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "../schema/user.schema"
import { Model } from "mongoose";
import {RegisterUserDto} from"../dto/user.dto";
import * as bcrypt from "bcrypt";
import { UserResponse } from "../response/user.response";
@Injectable()
export class  UserService{
   constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) { }
  async registerUser(registerUserDto:RegisterUserDto){
    const existingUser = await  this.userModel.findOne({email:registerUserDto.email});
    if(existingUser){
      throw new BadRequestException("user already exsists with this username");
    }
    const hashedPassword = await bcrypt.hash(registerUserDto.password,10);
    const newUser = new this.userModel({
      name:registerUserDto.name,
      email:registerUserDto.email,
      password:hashedPassword
    })
    const savedUser = await  newUser.save();
      const userResponse :UserResponse={
        id:savedUser._id.toString(),
        name:savedUser.name,
        email:savedUser.email,
      }
    return userResponse;
  }
}