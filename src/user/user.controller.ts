import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  public async findAll() {
    return this.userService.findAll();
  }

  @Post()
  public async createUser(@Body() dto: UserDto) {
    return this.userService.createUser(dto);
  }
}
