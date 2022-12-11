import { Module, ValidationPipe } from '@nestjs/common';

import { PostModule } from './post/post.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { getDbConfig } from './config/database/database.provider';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { APP_FILTER, APP_GUARD, APP_PIPE } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RolesGuard } from './auth/guards/roles.guard';
import { SequelizeExceptionFilter } from './config/filters/sequelizeExceptions.filter';
import { EmailModule } from './email/email.module';
import { JobModule } from './job/job.module';
import { ArbeitnowModule } from './arbeitnow/arbeitnow.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: `.${process.env.NODE_ENV}.env` }),
    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: getDbConfig,
    }),
    ScheduleModule.forRoot(),

    PostModule,
    UserModule,
    AuthModule,
    EmailModule,
    JobModule,
    ArbeitnowModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_PIPE,
      useFactory: () => new ValidationPipe({ whitelist: true, transform: true }),
    },
    {
      provide: APP_FILTER,
      useClass: SequelizeExceptionFilter,
    },
  ],
})
export class AppModule {}
