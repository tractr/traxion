import { JwtModuleOptions } from '@nestjs/jwt';
import { Prisma, User } from '@prisma/client';

import { EncryptionService } from '@trxn/nestjs-bcrypt';

export type UserInfo = { id: string | number; email: string; password: string };

export type ResetPasswordLinkFactory =
  | ((
      request: Record<string, unknown>,
      resetCode: string,
      user: User,
    ) => Promise<string> | string)
  | string;

export type ResetPasswordSendRequestEmail = (
  link: string,
  resetCode: string,
  user: User,
) => Promise<unknown> | unknown;

export type ResetPasswordSendRequestUpdated = (
  user: User,
) => Promise<unknown> | unknown;

export class PasswordModuleOptions {
  resetPasswordExpiresIn?: string | number | undefined;

  resetPasswordLinkFactory?: ResetPasswordLinkFactory;

  resetPasswordSendEmail?: {
    request?: ResetPasswordSendRequestEmail;
    updated?: ResetPasswordSendRequestUpdated;
  };

  user?: {
    fields?: {
      id: string;
      email: string;
      password: string;
    };
  };

  userService!: Prisma.UserDelegate<false>;

  jwtModuleOptions?: JwtModuleOptions;

  encryptionService?: EncryptionService;
}
