import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { EmailModule } from '../email/email.module';
import { UserModule } from '../user/user.module';
import { getJwtConfig } from '../config/jwt/jwt.provider';
import { TwoFaController } from './controllers/two-fa.controller';
import { TwoFaService } from './services/two-fa.service';
import { JwtTwoFaStrategy } from './strategies/jwt-two-fa.strategy';

@Module({
  controllers: [AuthController, TwoFaController],
  imports: [
    UserModule,
    PassportModule,
    EmailModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
  ],
  providers: [AuthService, TwoFaService, LocalStrategy, JwtStrategy, JwtTwoFaStrategy],
})
export class AuthModule {}
