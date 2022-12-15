import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  ClassSerializerInterceptor,
  UseInterceptors,
  Get,
  Query,
  BadRequestException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { Public } from '../decorators/public.decorator';
import { ACTIVATION_EMAIL_ERROR, USER_SUCCESSFULLY_ACTIVATED } from '../constants/auth.constant';
import { ApiOperation, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';
import { EmailService } from '../../email/email.service';
import { UserDto } from '../../user/dto/user.dto';
import { User } from '../../user/user.model';
import { UserService } from '../../user/user.service';

@ApiTags('auth')
@Public()
@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly emailService: EmailService,
  ) {}

  @ApiOperation({ summary: 'Register user' })
  @ApiResponse({ status: 200, type: User })
  @ApiBody({ type: UserDto })
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('register')
  async register(@Body() userDto: UserDto) {
    const user = await this.userService.createUser(userDto);
    const url = this.authService.activationUrl(user.email).toString();
    await this.emailService.sendActivationLink(user.email, url);
    return user;
  }

  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: 200 })
  @ApiBody({ type: UserDto })
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @ApiOperation({ summary: 'Verify email' })
  @ApiResponse({ status: 200, type: User })
  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(HttpStatus.OK)
  @Get('verify')
  async verifyEmail(@Query('token') token: string) {
    if (!token) {
      throw new BadRequestException(ACTIVATION_EMAIL_ERROR);
    }
    const email = await this.authService.decodeToken(token);
    const user = await this.userService.findByEmail(email);
    if (!user || user.active == true) {
      throw new BadRequestException(ACTIVATION_EMAIL_ERROR);
    }
    user.active = true;

    user.save();
    return USER_SUCCESSFULLY_ACTIVATED;
  }
}
