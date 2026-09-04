import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Testimonial, TestimonialSchema } from "../testimonials/schema/testimonials.schema";
import { TestimonialsController } from "../testimonials/controller/testimonials.controller";
import { TestimonialsService } from "../testimonials/service/testimonials.service";
import { CloudinaryModule } from "../common/cloudinary/cloudinary.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Testimonial.name, schema: TestimonialSchema }]),
    CloudinaryModule,
  ],
  controllers: [TestimonialsController],
  providers: [TestimonialsService],
})
export class TestimonialsModule {}