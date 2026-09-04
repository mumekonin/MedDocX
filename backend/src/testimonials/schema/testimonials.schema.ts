import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { TestimonialRole } from "src/common/enum/enum";

export type TestimonialDocument = Testimonial & Document;

@Schema({ timestamps: true })
export class Testimonial {
  @Prop({ required: true, trim: true })
  patientName: string;

  @Prop({
    type: String,
    enum: TestimonialRole,
    required: true,
  })
  role: TestimonialRole;

  @Prop({ required: true })
  avatarUrl: string;

  @Prop()
  avatarPublicId?: string;

  @Prop({ required: true, trim: true })
  message: string;

  @Prop({ default: 0 })
  order: number;

  @Prop({ default: true })
  isActive: boolean;
}

export const TestimonialSchema = SchemaFactory.createForClass(Testimonial);