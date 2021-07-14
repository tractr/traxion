import { InjectionToken } from '@angular/core';
import { AnyAbility } from '@casl/ability';
import { UserRoles } from '@prisma/client';
import { ClassConstructor } from 'class-transformer';
import { RequiredKeys } from 'ts-essentials';

import { User } from '../generated/models';

import { RolePermissions } from '@tractr/common';

export const SESSION_SERVICE = new InjectionToken('session.service');

export const AUTH_OPTIONS = new InjectionToken<AuthenticationOptions>(
  'auth.options',
);

export interface AuthenticationOptions<
  U extends User = User,
  CCU extends ClassConstructor<U> = ClassConstructor<U>,
  R extends UserRoles = UserRoles,
  A extends AnyAbility = AnyAbility,
> {
  api: {
    url: string;
  };
  user: CCU;

  rolePermissions?: RolePermissions<R, U, A>;

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
    disabled: boolean;
    reset: {
      url: string;
    };
  };
}

export type AuthenticationPublicOptions<
  U extends User = User,
  CCU extends ClassConstructor<U> = ClassConstructor<U>,
> = Pick<AuthenticationOptions<U, CCU>, 'api' | 'user' | 'rolePermissions'>;

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
  password: {
    disabled: false,
    reset: {
      url: 'reset',
    },
  },
};
