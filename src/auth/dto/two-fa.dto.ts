import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class TwoFaDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly code: string;
}
