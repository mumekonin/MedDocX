import { IsEmail, IsNotEmpty, IsString, MinLength ,IsOptional} from 'class-validator';
export class RegisterUserDto{
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  name!: string;
  @IsEmail()
  email!: string
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password!:string
}
export class LoginDto {
  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password!: string;
}
export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}
export class ChangePasswordDto {
  @IsString()
  @IsNotEmpty()
  currentPassword!: string;

  @IsString()
  @MinLength(8)
  newPassword!: string;
}