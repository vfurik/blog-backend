import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { EMAIL_ACTIVATION } from './templates/email.tamplate';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(email: ISendMailOptions) {
    return this.mailerService.sendMail(email);
  }

  async sendActivationLink(email: string, url: string) {
    return this.sendEmail(EMAIL_ACTIVATION(email, url));
  }
}
