import { InjectionToken } from '@angular/core';
import { ClassConstructor } from 'class-transformer';
import { RequiredKeys } from 'ts-essentials';

import { User } from '../generated/models';

export const SESSION_SERVICE = new InjectionToken('session.service');

export const AUTH_OPTIONS = new InjectionToken<AuthenticationOptions>(
  'auth.options',
);

export interface AuthenticationOptions<
  U extends User = User,
  CCU extends ClassConstructor<U> = ClassConstructor<U>,
> {
  api: {
    url: string;
  };
  user: CCU;
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

export type AuthenticationPublicOptions<
  U extends User = User,
  CCU extends ClassConstructor<U> = ClassConstructor<U>,
> = Pick<AuthenticationOptions<U, CCU>, 'api' | 'user'>;

export type AuthenticationDefaultOptions<
  U extends User = User,
  CCU extends ClassConstructor<U> = ClassConstructor<U>,
> = Omit<
  AuthenticationOptions<U, CCU>,
  RequiredKeys<AuthenticationPublicOptions<U, CCU>>
>;

export const AUTH_DEFAULT_OPTIONS: AuthenticationDefaultOptions = {
  routing: {
    prefix: ['/'],
  },
  login: {
    url: 'login',
    routing: 'login',
    redirect: ['/'],
  },
  logout: {
    url: 'logout',
    redirect: ['/'],
  },
  session: {
    url: 'me',
  },
};
