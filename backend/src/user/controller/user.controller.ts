import { Controller, Post, Get, Put, Body, Req, Res } from '@nestjs/common';
import type { Response } from 'express';
import { UserService } from '../service/user.service';
import { RegisterUserDto, LoginDto, UpdateProfileDto, ChangePasswordDto } from '../dto/user.dto';
import { JwtAuthGuard } from '../../common/guards/jwtauth.gourds';
import { CommonUtils } from '../../common/utils/utils';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  async createUser(@Body() createUserDto: RegisterUserDto) {
    return this.userService.registerUser(createUserDto);
  }

  @Post('/login')
  async userLogin(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.userService.userLogin(loginDto);
    res.cookie('access_token', result.token, CommonUtils.authCookieOptions());
    return result;
  }

  @JwtAuthGuard()
  @Get('/me')
  async getProfile(@Req() req: any) {
    const userId = req.user.id;
    return this.userService.getProfile(userId);
  }

  @JwtAuthGuard()
  @Put('/me')
  async updateProfile(@Req() req: any, @Body() updateProfileDto: UpdateProfileDto) {
    const userId = req.user.id;
    return this.userService.updateProfile(userId, updateProfileDto);
  }

  @JwtAuthGuard()
  @Put('/me/password')
  async changePassword(@Req() req: any, @Body() changePasswordDto: ChangePasswordDto) {
    const userId = req.user.id;
    return this.userService.changePassword(userId, changePasswordDto);
  }

  @JwtAuthGuard()
  @Post('/logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token', CommonUtils.authCookieOptions());
    return { message: 'Logged out successfully' };
  }
}
