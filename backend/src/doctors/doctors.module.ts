import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Doctor, DoctorSchema } from "../doctors/schema/doctors.schema";
import { DoctorsController } from "../doctors/controller/doctors.controller";
import { DoctorsService } from "../doctors/service/doctors.service";
import { CloudinaryModule } from "../common/cloudinary/cloudinary.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Doctor.name, schema: DoctorSchema }]),
    CloudinaryModule,
  ],
  controllers: [DoctorsController],
  providers: [DoctorsService],
})
export class DoctorsModule {}