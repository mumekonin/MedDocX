import { IsBoolean, IsOptional, IsString, MinLength } from "class-validator";
import { Transform } from "class-transformer";

export class CreateServiceDto {
  @IsString()
  @MinLength(2)
  title: string;

  @IsString()
  @MinLength(2)
  icon: string;

  @IsString()
  @MinLength(5)
  shortDescription: string;

  @IsString()
  @MinLength(5)
  fullDescription: string;

  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  isActive?: boolean;
}
export class UpdateServiceDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  title: string;
  @IsOptional()
  @IsString()
  @MinLength(2)
  icon: string;
  @IsOptional()
  @IsString()
  @MinLength(5)
  shortDescription: string;
  @IsOptional()
  @IsString()
  @MinLength(5)
  fullDescription: string;

  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  isActive?: boolean;

}