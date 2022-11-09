import { ISendMailOptions } from '@nestjs-modules/mailer';
import { EMAIL_FROM, ACTIVATION_SUBJECT } from '../constants/email.constants';

const activationText = (url: string): string => `To confirm the email address, click here: ${url}`;

export const EMAIL_ACTIVATION = (email: string, url: string): ISendMailOptions => {
  return {
    to: email,
    from: EMAIL_FROM,
    subject: ACTIVATION_SUBJECT,
    text: activationText(url),
  };
};
