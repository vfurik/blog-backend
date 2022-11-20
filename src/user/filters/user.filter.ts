import { IsOptional } from 'class-validator';
import { Role } from '../role/role.enum';
import { ApiProperty } from '@nestjs/swagger';

export class UserFilter {
  @ApiProperty({ required: false })
  @IsOptional()
  readonly email: string;

  @ApiProperty({ required: false })
  @IsOptional()
  readonly role: Role;
}
