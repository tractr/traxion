import { JwtModuleOptions } from '@nestjs/jwt';
import { IAuthModuleOptions } from '@nestjs/passport';
import { CookieOptions } from 'express';
import { StrategyOptions } from 'passport-jwt';
import { IStrategyOptionsWithRequest } from 'passport-local';

import { User } from '../../prisma/client';

export type AuthenticationDefaultOptions = {
  login: {
    saltRounds: number;
  };
  password: {
    reset: {
      link: string;
      subject: string;
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
    name?: string;
  };
};

export type AuthenticationPublicOptions =
  Partial<AuthenticationDefaultOptions> & {
    api: {
      url: string;
    };
    mailer: {
      from: string;
    };
  };

export type AuthenticationOptions = AuthenticationDefaultOptions &
  AuthenticationPublicOptions;
