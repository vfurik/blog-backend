import { MailerOptions } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

export const getEmailConfig = async (configService: ConfigService): Promise<MailerOptions> => {
  return {
    transport: {
      host: configService.get('EMAIL_HOST'),
      port: +configService.get('EMAIL_PORT'),
      auth: { user: configService.get('EMAIL_HOST_USER'), pass: configService.get('EMAIL_HOST_PASSWORD') },
    },
  };
};
