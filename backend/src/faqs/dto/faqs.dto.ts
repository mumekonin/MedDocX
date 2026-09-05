import { IsBoolean, IsOptional, IsString, MinLength } from "class-validator";
import { Transform } from "class-transformer";
import { PartialType } from "@nestjs/mapped-types";

export class CreateFaqDto {
  @IsString()
  @MinLength(5)
  question: string;

  @IsString()
  @MinLength(5)
  answer: string;

  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  isActive?: boolean;
}
export class UpdateFaqDto extends PartialType(CreateFaqDto) {}