import { HttpModuleOptions } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

export const getHttpConfig = async (configService: ConfigService): Promise<HttpModuleOptions> => {
  return { timeout: 20000, baseURL: configService.get('ARBEITNOW_URL') };
};
