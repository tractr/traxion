import { JwtModuleOptions } from '@nestjs/jwt';
import { IAuthModuleOptions } from '@nestjs/passport';
import { CookieOptions } from 'express';
import { StrategyOptions } from 'passport-jwt';
import { IStrategyOptionsWithRequest } from 'passport-local';

import { User } from '../../prisma/client';

export interface AuthenticationOptions {
  login: {
    saltRounds?: number;
  };
  user: {
    idField: keyof User;
    nameField: keyof User;
    passwordField: keyof User;
  };
  password: {
    reset: {
      link: string;
      subject: string;
      codeField: keyof User;
      codeLength?: number;
      template?: number;
    };
  };
  cookies: {
    cookieName: string;
    queryParamName: string;
    options: CookieOptions;
  };
  strategy: {
    jwt: StrategyOptions;
    local: IStrategyOptionsWithRequest & {
      usernameField: keyof User;
      passwordField: keyof User;
    };
  };
  jwtModuleOptions: JwtModuleOptions;
  passportModuleOptions: IAuthModuleOptions;
  mailer: {
    from: string;
    name?: string;
  };
}
