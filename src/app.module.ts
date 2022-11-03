import { Module } from '@nestjs/common';

import { PostModule } from './post/post.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { getDbConfig } from './config/database/database.providers';
import { UtilsModule } from './utils/utils.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: getDbConfig,
    }),
    PostModule,
    UtilsModule.forRoot('test'),
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
