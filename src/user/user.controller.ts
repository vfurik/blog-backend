import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { Role } from './role/role.enum';
import { UserFilter } from './filters/user.filter';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';
import { User } from './user.model';
import { Roles } from '../auth/decorators/roles.decorators';
import { JwtTwoFaGuard } from '../auth/guards/jwt-two-fa.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
@UseGuards(JwtTwoFaGuard, RolesGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Find all users', description: 'Role: [ADMIN]' })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  @Roles(Role.ADMIN)
  public async findAll(@Query() query?: UserFilter) {
    return this.userService.findAll(query);
  }

  @ApiOperation({ summary: 'Create new user', description: 'Role: [ADMIN]' })
  @ApiResponse({ status: 201, type: User })
  @ApiBody({ type: UserDto })
  @Post()
  @Roles(Role.ADMIN)
  public async createUser(@Body() dto: UserDto) {
    const user = await this.userService.createUser(dto);
    return this.userService.activateUser(user);
  }
}
