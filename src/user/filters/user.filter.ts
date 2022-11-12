import { IsEmail, IsEnum, IsOptional } from 'class-validator';
import { Role } from '../role/role.enum';

export class UserFilter {
  @IsOptional()
  @IsEmail()
  readonly email: string;
  @IsOptional()
  @IsEnum(Role)
  readonly role: Role;
}
