import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { UserDto } from './dto/user.dto';
import { Role } from './role/role.enum';
import { UserSearch } from './search/user.search';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Roles(Role.ADMIN)
  public async findAll(@Query() query: UserSearch) {
    return this.userService.findAll(query);
  }

  @Post()
  @Roles(Role.ADMIN)
  public async createUser(@Body() dto: UserDto) {
    return this.userService.createUser(dto);
  }
}
