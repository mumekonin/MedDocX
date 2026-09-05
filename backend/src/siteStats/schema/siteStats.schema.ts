import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type SiteStatsDocument = SiteStats & Document;

@Schema({ timestamps: true })
export class SiteStats {
  @Prop({ required: true, default: "0+" })
  patientsCount: string;

  @Prop({ required: true, default: "0+" })
  doctorsCount: string;

  @Prop({ required: true, default: "24/7" })
  emergencyCareLabel: string;
}

export const SiteStatsSchema = SchemaFactory.createForClass(SiteStats);