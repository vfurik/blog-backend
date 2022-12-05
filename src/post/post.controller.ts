import { BadRequestException, Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';

import { POST_NOT_FOUND } from './constants/post.constant';
import { PostDto } from './dto/post.dto';
import { PostService } from './post.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';
import { Post as post } from './post.model';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { Roles } from '../auth/decorators/roles.decorators';
import { Role } from '../user/role/role.enum';
import { User } from '../user/user.model';

@ApiTags('posts')
@ApiBearerAuth()
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiOperation({ summary: 'Find all posts as admin' })
  @ApiResponse({ status: 200, type: [post] })
  @Roles(Role.ADMIN)
  @Get('all')
  async findAll() {
    return this.postService.findAll();
  }

  @ApiOperation({ summary: 'Find all posts as user' })
  @ApiResponse({ status: 200, type: [post] })
  @Get()
  async findApproved(@GetUser() user: User) {
    return this.postService.findApproved(user.id);
  }

  @ApiOperation({ summary: 'Find my posts' })
  @ApiResponse({ status: 200, type: [post] })
  @Get('my')
  async findMy(@GetUser() user: User) {
    return this.postService.findMy(user.id);
  }

  @ApiOperation({ summary: 'Create new post' })
  @ApiResponse({ status: 201, type: post })
  @ApiBody({ type: PostDto })
  @Post()
  async create(@Body() dto: PostDto, @GetUser() user: User) {
    return this.postService.create(dto, user.id);
  }

  @ApiOperation({ summary: 'Approve post', description: 'Role: [ADMIN]' })
  @ApiResponse({ status: 200, type: post })
  @Roles(Role.ADMIN)
  @HttpCode(HttpStatus.OK)
  @Post('approve/:id')
  async approve(@Param('id') id: number) {
    const post = await this.postService.findById(id);
    if (!post) throw new BadRequestException(POST_NOT_FOUND);
    post.approved = true;

    return post.save();
  }
}
