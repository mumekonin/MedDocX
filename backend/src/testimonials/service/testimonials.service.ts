import { NotFoundException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Testimonial, TestimonialDocument } from "../schema/testimonials.schema";
import { CreateTestimonialDto,UpdateTestimonialDto } from "../dto/testimonials.dto";
import { TestimonialResponse } from "../response/testimonials.response";
import { CloudinaryService } from "../../common/cloudinary/service/cloudinary.service";
import { BadRequestException } from "@nestjs/common";

const TESTIMONIAL_AVATAR_FOLDER = "meddocx/testimonials";

@Injectable()
export class TestimonialsService {
  constructor(
    @InjectModel(Testimonial.name)
    private readonly testimonialModel: Model<TestimonialDocument>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(
    createTestimonialDto: CreateTestimonialDto,
    avatar: Express.Multer.File,
  ): Promise<TestimonialResponse> {
    if (!avatar) {
      throw new BadRequestException("avatar image is required");
    }

    const nextOrder = await this.getNextOrder();
    const uploadResult = await this.cloudinaryService.uploadImage(avatar, TESTIMONIAL_AVATAR_FOLDER);

    const newTestimonial = new this.testimonialModel({
      ...createTestimonialDto,
      order: nextOrder,
      avatarUrl: uploadResult.url,
      avatarPublicId: uploadResult.publicId,
    });
    const savedTestimonial = await newTestimonial.save();

    return this.toResponse(savedTestimonial);
  }

  async findAll(): Promise<TestimonialResponse[]> {
    const testimonials = await this.testimonialModel
      .find({ isActive: true })
      .sort({ order: 1 });
    return testimonials.map((testimonial) => this.toResponse(testimonial));
  }

  async findOne(testimonialId: string): Promise<TestimonialResponse> {
    const testimonial = await this.testimonialModel.findById(testimonialId);
    if (!testimonial) {
      throw new NotFoundException(`testimonial with id ${testimonialId} not found`);
    }
    return this.toResponse(testimonial);
  }

  async update(
    testimonialId: string,
    updateTestimonialDto: UpdateTestimonialDto,
    avatar?: Express.Multer.File,
  ): Promise<TestimonialResponse> {
    const existingTestimonial = await this.testimonialModel.findById(testimonialId);
    if (!existingTestimonial) {
      throw new NotFoundException(`testimonial with id ${testimonialId} not found`);
    }

    let avatarUrl = existingTestimonial.avatarUrl;
    let avatarPublicId = existingTestimonial.avatarPublicId;

    if (avatar) {
      const uploadResult = await this.cloudinaryService.uploadImage(avatar, TESTIMONIAL_AVATAR_FOLDER);
      avatarUrl = uploadResult.url;
      avatarPublicId = uploadResult.publicId;

      if (existingTestimonial.avatarPublicId) {
        await this.cloudinaryService.deleteImage(existingTestimonial.avatarPublicId);
      }
    }

    const updatedTestimonial = await this.testimonialModel.findByIdAndUpdate(
      testimonialId,
      { $set: { ...updateTestimonialDto, avatarUrl, avatarPublicId } },
      { new: true },
    );

    return this.toResponse(updatedTestimonial!);
  }

  async remove(testimonialId: string): Promise<{ message: string }> {
    const deletedTestimonial = await this.testimonialModel.findByIdAndDelete(testimonialId);
    if (!deletedTestimonial) {
      throw new NotFoundException(`testimonial with id ${testimonialId} not found`);
    }

    if (deletedTestimonial.avatarPublicId) {
      await this.cloudinaryService.deleteImage(deletedTestimonial.avatarPublicId);
    }

    return { message: "testimonial deleted successfully" };
  }

  private async getNextOrder(): Promise<number> {
    const lastTestimonial = await this.testimonialModel
      .findOne()
      .sort({ order: -1 })
      .select('order');
    return lastTestimonial ? lastTestimonial.order + 1 : 1;
  }

  private toResponse(testimonial: TestimonialDocument): TestimonialResponse {
    return {
      id: testimonial._id.toString(),
      patientName: testimonial.patientName,
      role: testimonial.role,
      avatarUrl: testimonial.avatarUrl,
      message: testimonial.message,
      order: testimonial.order,
      isActive: testimonial.isActive,
      createdAt: (testimonial as any).createdAt,
    };
  }
}