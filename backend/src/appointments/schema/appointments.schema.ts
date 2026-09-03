import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { AppointmentStatus } from '../../common/enum/enum';

export type AppointmentDocument = Appointment & Document & { createdAt: Date };

@Schema({ timestamps: true })
export class Appointment {
  @Prop({ required: true, trim: true })
  patientName!: string;

  @Prop({ required: true, lowercase: true, trim: true })
  email!: string;

  @Prop({ required: true, trim: true })
  phone!: string;

  @Prop({ type: Types.ObjectId, ref: 'Doctor', required: false })
  preferredDoctor?: Types.ObjectId;

  @Prop({ required: true })
  preferredDate!: Date;

  @Prop({ required: true })
  preferredTime!: string;

  @Prop({ trim: true })
  reason?: string;

  @Prop({
    type: String,
    enum: AppointmentStatus,
    default: AppointmentStatus.PENDING,
  })
  status!: string;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
