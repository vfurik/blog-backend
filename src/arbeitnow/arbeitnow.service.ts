import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { catchError } from 'rxjs';
import { API_URL } from './constants/arbeitnow.constants';
import { Data, JobsResponse } from './responces/jobs.response';
import { lastValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { JobDto } from 'src/job/dto/job.dto';

@Injectable()
export class ArbeitnowService {
  private readonly logger = new Logger(ArbeitnowService.name);
  constructor(private readonly httpService: HttpService) {}

  async getJobs(createdAt: number): Promise<JobDto[]> {
    const { data } = await lastValueFrom(
      this.httpService.get<JobsResponse>(API_URL.jobs).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw new InternalServerErrorException({ error: 'External server error' });
        }),
      ),
    );
    const filteredJobs = data.data.filter(this.filter(createdAt));
    const jobs: JobDto[] = filteredJobs.map(this.parse);

    return jobs;
  }

  private filter =
    (createdAt: number): ((data: Data) => boolean) =>
    (data) =>
      data.created_at > createdAt;

  private parse = (data: Data): JobDto => ({
    title: data.title,
    remote: data.remote,
    location: data.location,
    tags: data.tags,
    jobTypes: data.job_types,
    createdAt: data.created_at,
  });
}
