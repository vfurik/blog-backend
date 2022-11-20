import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ArbeitnowService } from 'src/arbeitnow/arbeitnow.service';
import { JobFilter } from './filters/job.filter';
import { JobService } from './job.service';

@Controller('jobs')
export class JobController {
  constructor(private readonly jobService: JobService, private readonly arbeitnowService: ArbeitnowService) {}

  @Get()
  async getAll(@Query() jobFilter: JobFilter) {
    return this.jobService.getAll(jobFilter);
  }

  @Get('refresh')
  async refresh() {
    const maxCreatedAt = await this.jobService.maxCreatedAt();
    const jobs = await this.arbeitnowService.getJobs(maxCreatedAt);

    return this.jobService.create(jobs);
  }
}
