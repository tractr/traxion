import { InjectionToken } from '@angular/core';
import { ClassConstructor } from 'class-transformer';

import { AuthenticationOptions } from '../dtos';

export const AUTHENTICATION_OPTIONS = new InjectionToken<
  typeof AuthenticationOptions
>('auth.options');

export const AUTHENTICATION_USER_DTO = new InjectionToken<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ClassConstructor<any>
>('authentication.user.dto');
