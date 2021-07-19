import { ExtractJwt } from 'passport-jwt';

import { fromHttpOnlySignedAndSecureCookies } from '../extractors';
import { AuthenticationOptions } from '../interfaces';

import { isDevelopment, isProduction } from '@tractr/nestjs-core';

export const AUTHENTICATION_COOKIE_NAME = 'authCookie';
export const AUTHENTICATION_QUERY_PARAM_NAME = 'authToken';
export const AUTHENTICATION_OPTIONS: AuthenticationOptions = {
  api: {
    url: '',
  },
  login: {
    saltRounds: 10,
  },
  password: {
    reset: {
      subject: 'Lost password',
      link: `/password/reset/{{id}}/{{code}}`,
    },
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
  mailer: {
    from: '',
    name: 'Tractr',
  },
};
