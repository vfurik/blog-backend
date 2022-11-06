import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';
import { USER_AUTH_ERROR } from './constants/auth.constant';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user || user.active == false) {
      throw new UnauthorizedException(USER_AUTH_ERROR);
    }
    const isCorresctPassword = await compare(password, user.password);
    if (!isCorresctPassword) {
      throw new UnauthorizedException(USER_AUTH_ERROR);
    }

    return { email: user.email, role: user.role, id: user.id };
  }

  async login(user: User) {
    const payload = { email: user.email, role: user.role, id: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
