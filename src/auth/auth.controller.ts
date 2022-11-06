import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { UserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Public } from './decorators/public.decorator';
@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService, private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  async register(@Body() userDto: UserDto) {
    return this.userService.createUser(userDto);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
