import { Inject, Injectable } from '@nestjs/common';

import { MODULE_OPTIONS_TOKEN } from '../authentication.module-definition';
import {
  DEFAULT_COOKIE_NAME,
  DEFAULT_URL_QUERY_PARAM_NAME,
} from '../constants';
import { AuthenticationModuleOptions } from '../interfaces';

import { isProduction } from '@trxn/nestjs-core';

@Injectable()
export class CookieOptionsService {
  constructor(
    @Inject(MODULE_OPTIONS_TOKEN)
    private readonly authenticationOptions: AuthenticationModuleOptions,
  ) {}

  get cookieName() {
    return (
      this.authenticationOptions.cookies?.cookieName || DEFAULT_COOKIE_NAME
    );
  }

  get queryParamName() {
    return (
      this.authenticationOptions.cookies?.queryParamName ||
      DEFAULT_URL_QUERY_PARAM_NAME
    );
  }

  get cookieOptions() {
    return {
      httpOnly: true,
      maxAge: 86400000,
      secure: isProduction(),
      ...(this.authenticationOptions.cookies?.options || {}),
    };
  }
}

