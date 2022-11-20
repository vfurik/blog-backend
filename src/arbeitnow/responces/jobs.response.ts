export interface JobsResponse {
  data: Data[];
  links: Links;
  meta: Meta;
}

export interface Data {
  slug: string;
  company_name: string;
  title: string;
  description: string;
  remote: boolean;
  url: string;
  tags: string[];
  job_types: string[];
  location: string;
  created_at: number;
}

export interface Links {
  first: string;
  last: null;
  prev: string;
  next: string;
}

export interface Meta {
  current_page: number;
  from: number;
  path: string;
  per_page: number;
  to: number;
  terms: string;
  info: string;
}
