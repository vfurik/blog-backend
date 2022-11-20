import { IsOptional } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class JobFilter {
  @ApiProperty({ required: false })
  @IsOptional()
  readonly title: string;

  @ApiProperty({ required: false })
  @Transform(({ value }) => value === 'true')
  @IsOptional()
  readonly remote: string;

  @ApiProperty({ required: false })
  @Type(() => Number)
  @IsOptional()
  readonly page: number;

  @ApiProperty({ required: false })
  @Type(() => Number)
  @IsOptional()
  readonly limit: number;
}
