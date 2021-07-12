import { InjectionToken } from '@angular/core';

import { User } from '../../generated/models';

export interface AuthenticationOptionsInterface<U extends User = User> {
  api: {
    url: string;
  };
  user: U;
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
}

export const AUTH_OPTIONS = new InjectionToken<AuthenticationOptionsInterface>(
  'auth.options',
);

export const SESSION_SERVICE = new InjectionToken('session.service');
