import { InjectionToken } from '@angular/core';

import { AuthenticationModuleOptions } from '../types';

export const AUTHENTICATION_OPTIONS =
  new InjectionToken<AuthenticationModuleOptions>('auth.options');
