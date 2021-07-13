import { InjectionToken } from '@angular/core';
import { ClassConstructor } from 'class-transformer';

import { User } from './generated/models';

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

export const AUTH_OPTIONS = new InjectionToken<AuthenticationOptions>(
  'auth.options',
);

export const SESSION_SERVICE = new InjectionToken('session.service');
