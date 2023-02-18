import { JwtModuleOptions } from '@nestjs/jwt';

import { SendEmailParams } from '@trxn/nestjs-mailer';
import { MinimalUser } from '@trxn/nestjs-user';

export type LinkFactory =
  | (<U extends MinimalUser = MinimalUser>(
      request: Record<string, unknown>,
      resetCode: string,
      user: U,
    ) => Promise<string> | string)
  | string;

export type UserSecretFactory = <U extends MinimalUser = MinimalUser>(
  request: Record<string, unknown>,
  user: U,
) => Promise<string> | string;

export type RequestPasswordEmailParams = {
  from: string;
  to: string;
  subject: string;
  context: Record<string, unknown> & {
    email: string;
    link: string;
    resetCode: string;
  };
  html: string;
};

export type UpdatePasswordSuccessEmailParams = {
  from: string;
  to: string;
  subject: string;
  context: Record<string, unknown> & {
    email: string;
  };
  html: string;
};

export interface ResetPasswordModuleOptions {
  expiresIn?: string | number | undefined;

  linkFactory?: LinkFactory;
  userSecretFactory?: UserSecretFactory;

  from: string;

  requestPasswordEmailParams?: (
    defaultEmailParams: RequestPasswordEmailParams,
  ) => SendEmailParams;

  updatePasswordSuccessEmailParams?: (
    defaultEmailParams: UpdatePasswordSuccessEmailParams,
  ) => SendEmailParams;

  jwtModuleOptions?: JwtModuleOptions;
}
