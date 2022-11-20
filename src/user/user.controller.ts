import { Body, ClassSerializerInterceptor, Controller, Get, Post, Query, UseInterceptors } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { UserDto } from './dto/user.dto';
import { Role } from './role/role.enum';
import { UserFilter } from './filters/user.filter';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';
import { User } from './user.model';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Find all users', description: 'Role:[ADMIN]' })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  @Roles(Role.ADMIN)
  public async findAll(@Query() query?: UserFilter) {
    return this.userService.findAll(query);
  }

  @ApiOperation({ summary: 'Find all users', description: 'Role:[ADMIN]' })
  @ApiResponse({ status: 201, type: User })
  @ApiBody({ type: UserDto })
  @Post()
  @Roles(Role.ADMIN)
  public async createUser(@Body() dto: UserDto) {
    return this.userService.createUser(dto);
  }
}
