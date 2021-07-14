import { Injectable } from '@nestjs/common';
import { ExtractJwt } from 'passport-jwt';

import { fromHttpOnlySignedAndSecureCookies } from '../extractors';
import { AuthenticationOptions } from '../interfaces';

import {
  isDevelopment,
  isProduction,
  OptionsFactory,
} from '@tractr/nestjs-core';

export const AUTHENTICATION_COOKIE_NAME = 'authCookie';
export const AUTHENTICATION_QUERY_PARAM_NAME = 'authToken';
export const AUTHENTICATION_OPTIONS: AuthenticationOptions = {
  login: {
    saltRounds: 10,
  },
  password: {
    resetCodeLength: 126,
  },
  cookies: {
    cookieName: AUTHENTICATION_COOKIE_NAME,
    queryParamName: 'authToken',
    options: {
      httpOnly: true,
      secure: isProduction(),
    },
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
      idField: 'id',
      usernameField: 'email',
      passwordField: 'password',
    },
  },
  jwtModuleOptions: {
    secret: isDevelopment() ? 'secret' : undefined,
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
