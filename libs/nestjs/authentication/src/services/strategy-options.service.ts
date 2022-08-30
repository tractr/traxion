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
  AUTHENTICATION_DEFAULT_COOKIE_NAME,
  AUTHENTICATION_DEFAULT_QUERY_PARAM_NAME,
} from '../constants';
import { fromHttpOnlySignedAndSecureCookies } from '../extractors';
import { AuthenticationModuleOptions } from '../interfaces';
import { JwtOptionsService } from './jwt-options.service';

import { isDevelopment } from '@tractr/nestjs-core';

@Injectable()
export class StrategyOptionsService {
  constructor(
    @Inject(MODULE_OPTIONS_TOKEN)
    private readonly authenticationOptions: AuthenticationModuleOptions,
    private readonly jwtOptionsService: JwtOptionsService,
  ) {}

  private get fields() {
    return {
      id: 'id',
      login: 'email',
      password: 'password',
      ...(this.authenticationOptions.user?.fields || {}),
    };
  }

  get localStrategyOptions(): LocalStrategyOptions {
    const { login, password } = this.fields;
    const strategyOptions = this.authenticationOptions.strategy?.local || {};

    return {
      passReqToCallback: true,
      ...strategyOptions,
      usernameField: login,
      passwordField: password,
    };
  }

  get passportJwtOptions(): PassportJwtStrategyOptions {
    const passportJwtStrategyOptions =
      this.authenticationOptions.strategy?.jwt || {};

    return {
      ...this.convertJwtModuleOptionsToPassportOptions(
        this.jwtOptionsService.jwtModuleOptions,
      ),
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromExtractors([
        fromHttpOnlySignedAndSecureCookies(AUTHENTICATION_DEFAULT_COOKIE_NAME),
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        ExtractJwt.fromUrlQueryParameter(
          AUTHENTICATION_DEFAULT_QUERY_PARAM_NAME,
        ),
      ]),
      ...passportJwtStrategyOptions,
    };
  }

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
