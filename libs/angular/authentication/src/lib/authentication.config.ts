import { InjectionToken } from '@angular/core';

export interface AuthenticationOptionsInterface {
  api: {
    url: string;
  };
  routing: {
    prefix: string[];
  };
  login: {
    url: string;
    routing: string;
    redirect: string[];
  };
  logout: {
    url: string;
    redirect: string[];
  };
  session: {
    url: string;
  };
  password: {
    disable: boolean;
    reset: {
      url: string;
    };
  };
}

export const AUTH_OPTIONS = new InjectionToken<AuthenticationOptionsInterface>(
  'auth.options',
);

export interface AuthenticationForRootInterface {
  options: Partial<AuthenticationOptionsInterface>;
}
