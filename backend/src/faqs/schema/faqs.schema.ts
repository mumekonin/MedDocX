import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type FaqDocument = Faq & Document;

@Schema({ timestamps: true })
export class Faq {
  @Prop({ required: true, trim: true })
  question: string;

  @Prop({ required: true, trim: true })
  answer: string;

  @Prop({ default: 0 })
  order: number;

  @Prop({ default: true })
  isActive: boolean;
}

export const FaqSchema = SchemaFactory.createForClass(Faq);