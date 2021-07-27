import {
  AUTHENTICATION_COOKIE_NAME,
  AUTHENTICATION_OPTIONS,
  AUTHENTICATION_QUERY_PARAM_NAME,
} from '../../../src/config/authentication.config';

import { isDevelopment, isProduction } from '@tractr/nestjs-core';

describe('User auth configurations', () => {
  describe('AUTHENTICATION_COOKIE_NAME', () => {
    it('should be a string with default value', () => {
      expect(AUTHENTICATION_COOKIE_NAME).toEqual('authCookie');
    });
  });

  describe('AUTHENTICATION_QUERY_PARAM_NAME', () => {
    it('should be a string with default value', () => {
      expect(AUTHENTICATION_QUERY_PARAM_NAME).toEqual('authToken');
    });
  });

  describe('AUTHENTICATION_OPTIONS', () => {
    it('should be a configuration object with default value', () => {
      expect(AUTHENTICATION_OPTIONS).toEqual({
        login: {
          saltRounds: 10,
        },
        password: {
          reset: {
            active: false,
            link: '/password/reset/{{id}}/{{code}}',
            subject: 'Lost password',
          },
        },
        cookies: {
          cookieName: 'authCookie',
          queryParamName: 'authToken',
          options: {
            httpOnly: true,
            secure: isProduction(),
          },
        },
        strategy: {
          jwt: {
            ignoreExpiration: false,
            jwtFromRequest: expect.any(Function),
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
      });
    });
  });
});
