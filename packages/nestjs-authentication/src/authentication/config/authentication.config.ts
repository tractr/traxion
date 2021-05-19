import { Injectable } from '@nestjs/common';
import { isDevelopment, OptionsFactory } from '@tractr/nestjs-core';
import { ExtractJwt } from 'passport-jwt';

import { fromHttpOnlySignedAndSecureCookies } from '../extractors';
import { AuthenticationOptions } from '../interfaces';

const { TRACTR_AUTH_STRATEGY_JWT_SECRET } = process.env;

export const AUTHENTICATION_COOKIE_NAME = 'authCookie';
export const AUTHENTICATION_QUERY_PARAM_NAME = 'authToken';
export const AUTHENTICATION_OPTIONS: AuthenticationOptions = {
  login: {
    saltRounds: 20,
  },
  cookies: {
    cookieName: AUTHENTICATION_COOKIE_NAME,
    queryParamName: 'authToken',
  },
  strategy: {
    jwt: {
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromExtractors([
        fromHttpOnlySignedAndSecureCookies(AUTHENTICATION_COOKIE_NAME),
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        ExtractJwt.fromUrlQueryParameter(AUTHENTICATION_QUERY_PARAM_NAME),
      ]),
    },
    local: {
      passReqToCallback: true,
      usernameField: 'email',
      passwordField: 'password',
    },
  },
  jwtModuleOptions: {
    secret:
      TRACTR_AUTH_STRATEGY_JWT_SECRET ?? isDevelopment() ? 'secret' : undefined,
  },
  passportModuleOptions: {
    defaultStrategy: 'jwt',
  },
};

@Injectable()
export class AuthenticationModuleOptionsFactory
  implements OptionsFactory<AuthenticationOptions>
{
  createOptions(): Promise<AuthenticationOptions> | AuthenticationOptions {
    return AUTHENTICATION_OPTIONS;
  }
}
