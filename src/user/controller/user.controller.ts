import { Controller ,Post,Body} from "@nestjs/common";
import { UserService } from "../service/user.service";
import { RegisterUserDto } from "../dto/user.dto";
@Controller('user')
export class UserController{
  constructor(
    private readonly userService: UserService
  ){}
  @Post('/register')
  async createUser(@Body() createUserDto: RegisterUserDto) {
    const result = await this.userService.registerUser(createUserDto)
    return result
  }
}