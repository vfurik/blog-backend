import { Body, Controller, Post } from '@nestjs/common';
import { UserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  async register(@Body() userDto: UserDto) {
    return this.userService.createUser(userDto);
  }
}
