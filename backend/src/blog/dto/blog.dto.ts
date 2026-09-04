import { IsBoolean, IsDateString, IsOptional, IsString, MinLength } from "class-validator";
import { Transform } from "class-transformer";
import { PartialType } from "@nestjs/mapped-types";
export class CreateBlogDto {
  @IsString()
  @MinLength(5)
  title: string;

  @IsString()
  @MinLength(10)
  excerpt: string;

  @IsString()
  @MinLength(20)
  content: string;

  @IsString()
  @MinLength(2)
  author: string;

  @IsDateString()
  publishDate: string;

  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  isPublished?: boolean;
}
export class UpdateBlogDto extends PartialType(CreateBlogDto) {}