import { Inject, Injectable } from '@nestjs/common';
import { SecretOrKeyProvider, StrategyOptions } from 'passport-jwt';
import { IStrategyOptionsWithRequest } from 'passport-local';

import { AUTHENTICATION_MODULE_OPTIONS } from '../constants';
import { AuthenticationOptions } from '../interfaces';

@Injectable()
export class StrategyOptionsService {
  constructor(
    @Inject(AUTHENTICATION_MODULE_OPTIONS)
    private readonly authenticationOptions: AuthenticationOptions,
  ) {}

  createLocalStrategyOptions(): IStrategyOptionsWithRequest {
    return this.authenticationOptions.strategy.local;
  }

  createJwtStrategyOptions(): StrategyOptions {
    const { verifyOptions, secret, secretOrKeyProvider } =
      this.authenticationOptions.jwtModuleOptions;
    const { algorithm, audience, issuer } =
      this.authenticationOptions.jwtModuleOptions.signOptions || {};
    const passportJwtStrategyOptions = this.authenticationOptions.strategy.jwt;
    return {
      algorithms: algorithm ? [algorithm] : undefined,
      audience: Array.isArray(audience) ? audience.join(',') : audience,
      issuer,
      jsonWebTokenOptions: verifyOptions,
      secretOrKey: secret,
      secretOrKeyProvider:
        secretOrKeyProvider as unknown as SecretOrKeyProvider,
      ...passportJwtStrategyOptions,
    };
  }
}
