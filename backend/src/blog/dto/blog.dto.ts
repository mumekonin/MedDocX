import { IsOptional, IsString, MinLength } from "class-validator";
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


}
export class UpdateBlogDto extends PartialType(CreateBlogDto) {}