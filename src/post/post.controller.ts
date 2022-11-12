import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/user/user.model';
import { PostDto } from './dto/post.dto';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async findAll(@GetUser() user: User) {
    return this.postService.findAll();
  }

  @Post()
  async create(@Body() dto: PostDto, @GetUser() user: User) {
    return this.postService.create({ ...dto, authorId: user.id });
  }
}
