import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { authenticator } from 'otplib';
import { User } from '../../user/user.model';
import { toFileStream } from 'qrcode';
import { Response } from 'express';
import { UserService } from '../../user/user.service';
import { TwoFaDto } from '../dto/two-fa.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TwoFaService {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  public async generateTwoFaSecret(user: User) {
    const secret = authenticator.generateSecret();
    const otpauthUrl = authenticator.keyuri(
      user.email,
      this.configService.get('TWO_FACTOR_AUTHENTICATION_APP_NAME'),
      secret,
    );

    await this.userService.setTwoFaSecret(secret, user);
    return { secret, otpauthUrl };
  }

  public async generateQrCode(stream: Response, otpauthUrl: string) {
    return toFileStream(stream, otpauthUrl);
  }

  public async isTwoFaCodeValid(twoFaDto: TwoFaDto, userId: number) {
    const user = await this.userService.findByPk(userId);
    return authenticator.verify({
      token: twoFaDto.code,
      secret: user.twofaSecret,
    });
  }

  public async signIn(user: User, isTwoFaAuthenticated: boolean) {
    const payload = {
      email: user.email,
      role: user.role,
      id: user.id,
      twofaEnabled: user.twofaEnabled,
      isTwoFaAuthenticated,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
