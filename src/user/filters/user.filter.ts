import { IsOptional } from 'class-validator';
import { Role } from '../role/role.enum';

export class UserFilter {
  @IsOptional()
  readonly email: string;
  @IsOptional()
  readonly role: Role;
}
