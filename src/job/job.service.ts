import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { JobDto } from './dto/job.dto';
import { JobFilter } from './filters/job.filter';
import { Job } from './job.model';

@Injectable()
export class JobService {
  constructor(@InjectModel(Job) private jobRepository: typeof Job) {}

  async create(jobs: JobDto[]) {
    return this.jobRepository.bulkCreate(jobs);
  }

  async getAll(filters: JobFilter) {
    const page = filters.page || 0;
    const limit = filters.limit || 20;

    const where: any = {};
    typeof filters.remote == 'boolean' && (where.remote = filters.remote);
    filters.title && (where.title = { [Op.iLike]: `%${filters.title}%` });

    const resp = await this.jobRepository.findAndCountAll({
      where,
      order: [['id', 'DESC']],
      offset: page * limit,
      limit,
    });

    return { data: resp.rows, meta: { total_count: resp.count, total_pages: Math.ceil(resp.count / limit) } };
  }

  async maxCreatedAt(): Promise<number> {
    return await Job.max('createdAt');
  }
}
