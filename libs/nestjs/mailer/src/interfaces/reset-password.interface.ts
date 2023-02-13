import { User } from '@prisma/client';

import { SendEmail } from './mailer-client.interface';

export type SendRequestResetPasswordEmailFactory = Omit<SendEmail, 'to'>;
export type SendUpdatedPasswordEmailFactory = Omit<SendEmail, 'to'>;

export interface ResetPasswordSendEmail {
  sendRequestResetPasswordEmailFactory(
    options: SendRequestResetPasswordEmailFactory,
  ): (
    link: string,
    resetCode: string,
    user: User,
  ) => Promise<unknown> | unknown;

  sendUpdatedPasswordEmailFactory(
    options: SendRequestResetPasswordEmailFactory,
  ): (user: User) => Promise<unknown> | unknown;
}
