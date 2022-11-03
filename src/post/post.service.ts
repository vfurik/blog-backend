import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PostDto } from './dto/post.dto';
import { Post } from './post.model';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post) private postRepository: typeof Post) {}

  async findAll() {
    return this.postRepository.findAll();
  }

  async create(dto: PostDto) {
    return this.postRepository.create(dto);
  }
}
