export type AuthenticationApiEndpoints =
  | 'me'
  | 'login'
  | 'logout'
  | 'resetPassword';

/**
 * Authentication module options.
 */
export type AuthenticationModuleOptions = {
  api: {
    url: string;

    endpoints: {
      me: string;
      login: string;
      logout: string;

      resetPassword: string;
    };

    getEndpoint: (endpoint: AuthenticationApiEndpoints) => string;
  };

  user: {
    validateUser: <U extends Record<string, unknown> = Record<string, unknown>>(
      user: unknown,
    ) => user is U;
  };

  redirect: {
    login: string;
  };

  initOnPageLoad: boolean;
};

export type AuthenticationOptions = {
  api?: {
    url?: string;

    endpoints?: {
      me?: string;
      login?: string;
      logout?: string;

      resetPassword?: string;
    };
  };

  user?: {
    validateUser?: <
      U extends Record<string, unknown> = Record<string, unknown>,
    >(
      user: unknown,
    ) => user is U;
  };

  redirect?: {
    login?: string;
  };

  initOnPageLoad?: boolean;
};
