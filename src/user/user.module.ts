import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import {MongooseModule} from "@nestjs/mongoose";
import {User,UserSchema} from"./schema/user.schema"
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema }
  
    ])
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
