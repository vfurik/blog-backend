import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getHttpConfig } from 'src/config/http/http.provider';
import { ArbeitnowService } from './arbeitnow.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      inject: [ConfigService],
      useFactory: getHttpConfig,
    }),
  ],
  providers: [ArbeitnowService],
  exports: [ArbeitnowService],
})
export class ArbeitnowModule {}
