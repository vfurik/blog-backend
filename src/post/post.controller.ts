import { Body, Controller, Get, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PostDto } from './dto/post.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly configService: ConfigService, private readonly postService: PostService) {}

  @Get()
  async findAll() {
    return this.postService.findAll();
  }

  @Post()
  async create(@Body() dto: PostDto) {
    return this.postService.create(dto);
  }

  @Post('truncate')
  async truncate() {
    this.postService.cleanUpDb();
  }
}
