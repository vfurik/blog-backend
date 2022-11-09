import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getEmailConfig } from 'src/config/email/email.providers';
import { EmailService } from './email.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: getEmailConfig,
    }),
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
