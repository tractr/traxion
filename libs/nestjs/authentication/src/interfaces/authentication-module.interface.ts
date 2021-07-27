import { JwtModuleOptions } from '@nestjs/jwt';
import { IAuthModuleOptions } from '@nestjs/passport';
import { CookieOptions } from 'express';
import { StrategyOptions } from 'passport-jwt';
import { IStrategyOptionsWithRequest } from 'passport-local';

import { User } from '../../prisma/client';

import { MailerPublicOptions } from '@tractr/nestjs-mailer';

export type AuthenticationDefaultOptions = {
  login: {
    saltRounds: number;
  };
  password: {
    reset: {
      active: boolean;
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
  mailer?: {
    name: string;
    from: string;
    moduleOptions: MailerPublicOptions;
  };
};

export type AuthenticationPublicOptions =
  Partial<AuthenticationDefaultOptions> & {
    api: {
      url: string;
    };
  };

export type AuthenticationOptions = AuthenticationDefaultOptions &
  AuthenticationPublicOptions;
