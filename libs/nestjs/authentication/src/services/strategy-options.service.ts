import { Inject, Injectable } from '@nestjs/common';
import { SecretOrKeyProvider, StrategyOptions } from 'passport-jwt';
import { IStrategyOptionsWithRequest } from 'passport-local';

import { AUTHENTICATION_MODULE_OPTIONS } from '../constants';
import { AuthenticationModuleOptions } from '../dtos';

@Injectable()
export class StrategyOptionsService {
  constructor(
    @Inject(AUTHENTICATION_MODULE_OPTIONS)
    private readonly authenticationOptions: AuthenticationModuleOptions,
  ) {}

  createLocalStrategyOptions(): IStrategyOptionsWithRequest {
    const { loginField, passwordField } = this.authenticationOptions.userConfig;

    return {
      ...this.authenticationOptions.strategy.local,
      usernameField: loginField,
      passwordField,
    };
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
