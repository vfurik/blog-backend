import { Job } from '../job.model';

export class JobResponse {
  data: Job[];
  meta: Meta;
}

export class Meta {
  total_count: number;
  total_pages: number;
}
