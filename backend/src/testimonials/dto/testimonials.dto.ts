import { IsBoolean, IsEnum, IsOptional, IsString, MinLength } from "class-validator";
import { Transform } from "class-transformer";
import { TestimonialRole } from "../../common/enum/enum";
import { PartialType } from "@nestjs/mapped-types";
export class CreateTestimonialDto {
  @IsString()
  @MinLength(2)
  patientName: string;

  @IsEnum(TestimonialRole)
  role: TestimonialRole;

  @IsString()
  @MinLength(10)
  message: string;

  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  isActive?: boolean;
}

export class UpdateTestimonialDto extends PartialType(CreateTestimonialDto) {}