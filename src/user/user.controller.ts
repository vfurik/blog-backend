import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserSearch } from './search/user.search';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  public async findAll(@Query() query: UserSearch) {
    return this.userService.findAll(query);
  }

  @Post()
  public async createUser(@Body() dto: UserDto) {
    return this.userService.createUser(dto);
  }
}
