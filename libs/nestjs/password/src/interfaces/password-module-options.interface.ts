import { JwtModuleOptions } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';

import { EncryptionService } from '@tractr/nestjs-bcrypt';

export type UserInfo = { id: string | number; email: string; password: string };

export type ResetPasswordLinkFactory =
  | ((
      request: Record<string, unknown>,
      resetCode: string,
      user: Record<string, string | number>,
    ) => Promise<string> | string)
  | string;

export type ResetPasswordSendRequestEmail = (
  link: string,
  resetCode: string,
  user: Record<string, string | number>,
) => Promise<void> | void;

export type ResetPasswordSendRequestUpdated = (
  user: Record<string, string | number>,
) => Promise<void> | void;

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
