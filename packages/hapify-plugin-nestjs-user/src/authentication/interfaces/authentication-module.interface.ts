import { User } from '@prisma/client';
import { StrategyOptions } from 'passport-jwt';
import { IStrategyOptionsWithRequest } from 'passport-local';
import { IAuthModuleOptions } from '@nestjs/passport';
import { JwtModuleOptions } from '@nestjs/jwt';

export interface AuthenticationOptions {
  login: {
    saltRounds?: number;
  };
  cookies: {
    cookieName: string;
    queryParamName: string;
  };
  strategy: {
    jwt: StrategyOptions;
    local: IStrategyOptionsWithRequest & {
      usernameField: keyof User;
      passwordField: keyof User;
    };
    [key: string]: unknown;
  };
  jwtModuleOptions: JwtModuleOptions;
  passportModuleOptions: IAuthModuleOptions;
}
