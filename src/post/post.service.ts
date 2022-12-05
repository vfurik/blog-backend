import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { PostDto } from './dto/post.dto';
import { Post } from './post.model';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post) private postRepository: typeof Post) {}

  async findAll() {
    return this.postRepository.findAll();
  }

  async findApproved(id: number) {
    return this.postRepository.findAll({ where: { [Op.or]: [{ approved: true }, { authorId: id }] } });
  }

  async findMy(id: number) {
    return this.postRepository.findAll({ where: { authorId: id } });
  }

  async create(dto: PostDto, authorId: number) {
    return this.postRepository.create({ ...dto, authorId });
  }

  async findById(id: number) {
    return this.postRepository.findByPk(id);
  }
}
