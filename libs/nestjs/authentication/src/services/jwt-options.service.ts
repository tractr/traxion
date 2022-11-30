import { Inject, Injectable } from '@nestjs/common';
import { JwtModuleOptions } from '@nestjs/jwt';

import { MODULE_OPTIONS_TOKEN } from '../authentication.module-definition';
import { AuthenticationModuleOptions } from '../interfaces';

import { isDevelopment } from '@trxn/nestjs-core';

@Injectable()
export class JwtOptionsService {
  constructor(
    @Inject(MODULE_OPTIONS_TOKEN)
    private readonly authenticationOptions: AuthenticationModuleOptions,
  ) {}

  get jwtModuleOptions(): JwtModuleOptions {
    return {
      secret: isDevelopment() ? 'secret' : undefined,
      ...(this.authenticationOptions.jwtModuleOptions || {}),
    };
  }
}
