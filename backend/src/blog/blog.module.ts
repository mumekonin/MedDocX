import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { BlogPost, BlogSchema } from "../blog/schema/blog.schema";
import { BlogController } from "./controller/blog.controller";
import { BlogService } from "../blog/service/blog.service";
import { CloudinaryModule } from "../common/cloudinary/cloudinary.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: BlogPost.name, schema: BlogSchema }]),
    CloudinaryModule,
  ],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}