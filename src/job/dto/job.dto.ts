import { IsArray, IsBoolean, IsNumber, IsString } from 'class-validator';

export class JobDto {
  @IsString()
  title: string;
  @IsBoolean()
  remote: boolean;
  @IsString()
  location: string;
  @IsArray()
  tags: string[];
  @IsArray()
  jobTypes: string[];
  @IsNumber()
  createdAt: number;
}
