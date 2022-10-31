import { ConfigService } from '@nestjs/config';
import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { Post } from '../../post/post.model';

export const getDbConfig = async (configService: ConfigService): Promise<SequelizeModuleOptions> => {
  return {
    dialect: 'postgres',
    uri: configService.get('DATABASE_URL'),
    models: [Post],
  };
};
