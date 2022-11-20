import { BadRequestException, Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { Role } from 'src/user/role/role.enum';
import { User } from 'src/user/user.model';
import { POST_NOT_FOUND } from './constants/post.constant';
import { PostDto } from './dto/post.dto';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Roles(Role.ADMIN)
  @Get('all')
  async findAll() {
    return this.postService.findAll();
  }

  @Get()
  async findApproved(@GetUser() user: User) {
    return this.postService.findApproved(user.id);
  }

  @Get('my')
  async findMy(@GetUser() user: User) {
    return this.postService.findMy(user.id);
  }

  @Post()
  async create(@Body() dto: PostDto, @GetUser() user: User) {
    return this.postService.create({ ...dto, authorId: user.id, approved: false });
  }

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
