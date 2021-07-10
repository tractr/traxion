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
  password: {
    resetCodeLength?: number;
  };
  cookies: {
    cookieName: string;
    queryParamName: string;
    options: CookieOptions;
  };
  strategy: {
    jwt: StrategyOptions;
    local: IStrategyOptionsWithRequest & {
      idField: keyof User;
      usernameField: keyof User;
      passwordField: keyof User;
    };
    [key: string]: unknown;
  };
  jwtModuleOptions: JwtModuleOptions;
  passportModuleOptions: IAuthModuleOptions;
}
