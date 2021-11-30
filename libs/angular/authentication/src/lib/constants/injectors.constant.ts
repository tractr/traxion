import { InjectionToken } from '@angular/core';

import { AuthenticationOptions } from '../dtos';

export const SESSION_SERVICE = new InjectionToken('session.service');

export const AUTHENTICATION_OPTIONS = new InjectionToken<AuthenticationOptions>(
  'auth.options',
);
