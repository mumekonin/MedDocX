import { Controller, Post, Body, Get, Req, Put } from "@nestjs/common";
import { UserService } from "../service/user.service";
import { LoginDto, RegisterUserDto, UpdateProfileDto, ChangePasswordDto } from "../dto/user.dto";
import { JwtAuthGuard } from "src/common/guards/jwtauth.gourds";
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) { }
  @Post('/register')
  async createUser(@Body() createUserDto: RegisterUserDto) {
    const result = await this.userService.registerUser(createUserDto)
    return result
  }
  @Post('/login')
  async userLogin(@Body() loginDto: LoginDto) {
    const result = await this.userService.userLogin(loginDto)
    return result
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
  logout() {
    return { message: 'Logged out successfully' };
  }
}