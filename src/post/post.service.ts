import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PostDto } from './dto/post.dto';
import { Post } from './post.model';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post) private postRepository: typeof Post, private sequelize: Sequelize) {}

  async findAll() {
    return this.postRepository.findAll();
  }

  async create(dto: PostDto) {
    return this.postRepository.create(dto);
  }

  async cleanUpDb() {
    this.sequelize.truncate();
  }
}
