import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { PostDto } from './dto/post.dto';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async findAll(@Request() request) {
    return this.postService.findAll();
  }

  @Post()
  async create(@Body() dto: PostDto) {
    return this.postService.create(dto);
  }
}
