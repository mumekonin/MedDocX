import { IsDateString, IsEmail, IsEnum, IsMongoId, IsNotEmpty, IsOptional, IsString, IsPhoneNumber, } from 'class-validator';
import { AppointmentStatus } from '../../common/enum/enum';

export class CreateAppointmentDto {
  @IsString()
  @IsNotEmpty()
  patientName!: string;

  @IsEmail()
  email!: string;

  @IsPhoneNumber('ET')
  phone: string;
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
