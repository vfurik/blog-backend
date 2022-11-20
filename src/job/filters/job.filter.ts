import { IsOptional } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class JobFilter {
  @IsOptional()
  readonly title?: string;

  @Transform(({ value }) => value === 'true')
  @IsOptional()
  readonly remote?: string;

  @Type(() => Number)
  @IsOptional()
  readonly page?: number;

  @Type(() => Number)
  @IsOptional()
  readonly limit?: number;
}
