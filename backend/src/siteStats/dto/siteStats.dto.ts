import { IsOptional, IsString } from "class-validator";

export class UpdateSiteStatsDto {
  @IsOptional()
  @IsString()
  patientsCount?: string;

  @IsOptional()
  @IsString()
  doctorsCount?: string;

  @IsOptional()
  @IsString()
  emergencyCareLabel?: string;
}