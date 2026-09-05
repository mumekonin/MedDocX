import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";
import { IsBoolean } from "class-validator";
import { Transform } from "class-transformer";

export class CreateContactDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(3)
  subject: string;

  @IsString()
  @MinLength(10)
  message: string;

  
  @IsOptional()
  @IsString()
  website?: string;
}
export class UpdateReadStatusDto {
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  isRead: boolean;
}