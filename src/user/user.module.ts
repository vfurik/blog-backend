import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  providers: [UserService],
  controllers: [UserController],
  imports: [SequelizeModule.forFeature([User])],
  exports: [UserService],
})
export class UserModule {}
