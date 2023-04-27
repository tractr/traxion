import { Inject, Injectable } from '@nestjs/common';
import { JwtModuleOptions } from '@nestjs/jwt';
import {
  ExtractJwt,
  StrategyOptions as PassportJwtStrategyOptions,
  SecretOrKeyProvider,
} from 'passport-jwt';
import { IStrategyOptionsWithRequest as LocalStrategyOptions } from 'passport-local';

import { MODULE_OPTIONS_TOKEN } from '../authentication.module-definition';
import {
  DEFAULT_COOKIE_NAME,
  DEFAULT_LOCAL_PASS_REQ_TO_CALLBACK,
  DEFAULT_LOCAL_PASSWORD_FIELD,
  DEFAULT_LOCAL_USERNAME_FIELD,
  DEFAULT_URL_QUERY_PARAM_NAME,
} from '../constants';
import { fromHttpOnlySignedAndSecureCookies } from '../extractors';
import { AuthenticationModuleOptions } from '../interfaces';
import { JwtOptionsService } from './jwt-options.service';

@Injectable()
export class StrategyOptionsService {
  constructor(
    @Inject(MODULE_OPTIONS_TOKEN)
    private readonly authenticationOptions: AuthenticationModuleOptions,
    private readonly jwtOptionsService: JwtOptionsService,
  ) {}

  get localStrategyOptions(): LocalStrategyOptions {
    return {
      passReqToCallback: DEFAULT_LOCAL_PASS_REQ_TO_CALLBACK,
      usernameField: DEFAULT_LOCAL_USERNAME_FIELD,
      passwordField: DEFAULT_LOCAL_PASSWORD_FIELD,
      ...this.authenticationOptions.strategy?.local,
    };
  }

  get jwtStrategyOptions(): PassportJwtStrategyOptions {
    const passportJwtStrategyOptions =
      this.authenticationOptions.strategy?.jwt || {};

    return {
      ...this.convertJwtModuleOptionsToPassportOptions(
        this.jwtOptionsService.jwtModuleOptions,
      ),
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromExtractors([
        fromHttpOnlySignedAndSecureCookies(DEFAULT_COOKIE_NAME),
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        ExtractJwt.fromUrlQueryParameter(DEFAULT_URL_QUERY_PARAM_NAME),
      ]),
      ...passportJwtStrategyOptions,
    };
  }

  @CheckAuth()
  @CheckAuth()
  @CheckAuth()
  convertJwtModuleOptionsToPassportOptions(
    jwtModuleOptions: JwtModuleOptions,
  ): Omit<PassportJwtStrategyOptions, 'jwtFromRequest'> {
    const { verifyOptions, secret, secretOrKeyProvider, signOptions } = {
      ...jwtModuleOptions,
    };
    const { algorithm, audience, issuer } = signOptions || {};

    return {
      algorithms: algorithm ? [algorithm] : undefined,
      audience: Array.isArray(audience) ? audience.join(',') : audience,
      issuer,
      jsonWebTokenOptions: verifyOptions,
      secretOrKey: secret,
      secretOrKeyProvider:
        secretOrKeyProvider as unknown as SecretOrKeyProvider,
    };
  }
}
