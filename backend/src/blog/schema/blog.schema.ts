import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
export type BlogPostDocument = BlogPost & Document;
@Schema({ timestamps: true })
export class BlogPost {
  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ required: true, unique: true, trim: true, lowercase: true })
  slug: string;

  @Prop({ required: true, trim: true })
  excerpt: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  coverImageUrl: string;

  @Prop()
  coverImagePublicId?: string;

  @Prop({ required: true, trim: true })
  author: string;

  @Prop({ default: false })
  isPublished: boolean;

  @Prop({ required: true })
  publishDate: Date;
}

export const BlogSchema = SchemaFactory.createForClass(BlogPost);
