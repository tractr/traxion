import {
  AuthenticationApiEndpoints,
  AuthenticationModuleOptions,
  AuthenticationOptions,
} from '../types';

export function authenticationModuleOptionsFactory(
  options: AuthenticationOptions = {},
): AuthenticationModuleOptions {
  const api = options.api || {};
  const endpoints = api.endpoints || {};
  const url = api?.url || '/api';

  return {
    api: {
      url,

      endpoints: {
        me: endpoints.me || '/me',
        login: endpoints.login || '/login',
        logout: endpoints.logout || '/logout',

        resetPassword: endpoints.resetPassword || '/reset/password',
      },

      getEndpoint: (endpoint: AuthenticationApiEndpoints): string =>
        `${url}/${endpoint}`,
    },
    user: {
      validateUser:
        typeof options.user?.validateUser === 'function'
          ? options.user.validateUser
          : <U extends Record<string, unknown> = Record<string, unknown>>(
              user: unknown,
            ): user is U => true,
    },

    redirect: {
      login: options.redirect?.login || '/login',
    },
  };
}
