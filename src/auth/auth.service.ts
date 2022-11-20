import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';
import { ACTIVATION_EMAIL_ERROR, USER_AUTH_ERROR } from './constants/auth.constant';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

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

  async decodeToken(token: string) {
    const payload = await this.jwtService.verify(token);
    if (!payload.email) {
      throw new BadRequestException(ACTIVATION_EMAIL_ERROR);
    }

    return payload.email;
  }

  activationUrl(email: string): URL {
    const token = this.generateVerificationToken({ email });
    const url = new URL(`${this.configService.get('EMAIL_VERIFICATION_URL')}/api/auth/confirm`);
    url.searchParams.set('token', token);
    return url;
  }

  private generateVerificationToken(payload: { email: string }) {
    return this.jwtService.sign(payload);
  }
}
