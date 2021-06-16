import {
  AUTHENTICATION_COOKIE_NAME,
  AUTHENTICATION_OPTIONS,
  AUTHENTICATION_QUERY_PARAM_NAME,
  AuthenticationModuleOptionsFactory,
} from '../../../src/config/authentication.config';

import { isClass, isDevelopment } from '@tractr/nestjs-core';

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
        cookies: {
          cookieName: 'authCookie',
          queryParamName: 'authToken',
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

  describe('AuthenticationModuleOptionsFactory', () => {
    it('should be a class', () => {
      expect(isClass(AuthenticationModuleOptionsFactory)).toBe(true);
    });
  });
});
