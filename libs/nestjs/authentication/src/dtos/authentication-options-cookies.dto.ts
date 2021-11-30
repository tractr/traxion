import { IsString, ValidateNested } from 'class-validator';
import { CookieOptions } from 'express';

import {
  AUTHENTICATION_DEFAULT_AUTH_TOKEN,
  AUTHENTICATION_DEFAULT_COOKIE_NAME,
} from '../constants';

import { isProduction } from '@tractr/nestjs-core';

export class AuthenticationOptionsCookies {
  @IsString()
  cookieName: string = AUTHENTICATION_DEFAULT_COOKIE_NAME;

  @IsString()
  queryParamName = AUTHENTICATION_DEFAULT_AUTH_TOKEN;

  @ValidateNested()
  options: CookieOptions = {
    httpOnly: true,
    secure: isProduction(),
  };
}
