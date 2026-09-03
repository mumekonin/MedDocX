import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
export type DoctorDocument = Doctor & Document;
@Schema({ timestamps: true })
export class Doctor {
  @Prop({ required: true, trim: true })
  name!: string;

  @Prop({ required: true, trim: true })
  specialty!: string;

  @Prop({ required: true })
  photoUrl!: string;

  @Prop({ trim: true })
  bio?: string;

  @Prop({ default: 0 })
  order!: number;

  @Prop({ default: true })
  isActive!: boolean;

  @Prop()
  photoPublicId?: string;
}

export const DoctorSchema = SchemaFactory.createForClass(Doctor);