import { IsDateString, IsEmail, IsMongoId, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, IsEnum } from "class-validator";
import { AppointmentStatus } from "src/common/enum/enum";

export class CreateAppointmentDto {
  @IsString()
  @IsNotEmpty()
  patientName!: string;

  @IsEmail()
  email!: string;

  @IsPhoneNumber()
  phone!: string;

  @IsOptional()
  @IsMongoId()
  preferredDoctor?: string;

  @IsDateString()
  preferredDate!: string;

  @IsString()
  @IsNotEmpty()
  preferredTime!: string;

  @IsOptional()
  @IsString()
  reason?: string;

  @IsOptional()
  @IsString()
  website?: string;
}
export class UpdateStatusDto {
  @IsEnum(AppointmentStatus)
  status!: AppointmentStatus;
}
export class QueryAppointmentDto {
  @IsOptional()
  @IsEnum(AppointmentStatus)
  status?: AppointmentStatus;
}