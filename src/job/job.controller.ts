import { Controller, Get, Query } from '@nestjs/common';
import { JobFilter } from './filters/job.filter';
import { JobService } from './job.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Job } from './job.model';
import { ArbeitnowService } from '../arbeitnow/arbeitnow.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@ApiTags('jobs')
@ApiBearerAuth()
@Controller('jobs')
export class JobController {
  constructor(private readonly jobService: JobService, private readonly arbeitnowService: ArbeitnowService) {}

  @ApiOperation({ summary: 'Find all jobs' })
  @ApiResponse({ status: 200, type: [Job] })
  @Get()
  async getAll(@Query() jobFilter: JobFilter) {
    return this.jobService.getAll(jobFilter);
  }

  @ApiOperation({ summary: 'Refresh jobs' })
  @ApiResponse({ status: 200, type: [Job] })
  @Cron(CronExpression.EVERY_HOUR)
  @Get('refresh')
  async refresh() {
    const maxCreatedAt = await this.jobService.maxCreatedAt();
    const jobs = await this.arbeitnowService.getJobs(maxCreatedAt);
    return this.jobService.create(jobs);
  }
}
