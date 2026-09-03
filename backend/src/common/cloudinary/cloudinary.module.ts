import { Module } from "@nestjs/common";
import { CloudinaryProvider } from "../cloudinary/cloudinary.config";
import { CloudinaryService } from "../cloudinary/service/cloudinary.service";

@Module({
  providers: [CloudinaryProvider, CloudinaryService],
  exports: [CloudinaryService],
})
export class CloudinaryModule {}