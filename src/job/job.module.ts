import { Module } from '@nestjs/common';
import { JobService } from './job.service';
import { JobController } from './job.controller';
import { Job } from './job.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { ArbeitnowModule } from '../arbeitnow/arbeitnow.module';

@Module({
  providers: [JobService],
  controllers: [JobController],
  imports: [SequelizeModule.forFeature([Job]), ArbeitnowModule],
})
export class JobModule {}
