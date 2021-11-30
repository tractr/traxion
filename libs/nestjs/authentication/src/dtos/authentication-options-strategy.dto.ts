import { ValidateNested } from 'class-validator';
import { ExtractJwt, StrategyOptions } from 'passport-jwt';
import { IStrategyOptionsWithRequest } from 'passport-local';

import {
  AUTHENTICATION_DEFAULT_COOKIE_NAME,
  AUTHENTICATION_DEFAULT_QUERY_PARAM_NAME,
} from '../constants';
import { fromHttpOnlySignedAndSecureCookies } from '../extractors';

export class AuthenticationOptionsStrategy {
  @ValidateNested()
  jwt: StrategyOptions = {
    ignoreExpiration: false,
    jwtFromRequest: ExtractJwt.fromExtractors([
      fromHttpOnlySignedAndSecureCookies(AUTHENTICATION_DEFAULT_COOKIE_NAME),
      ExtractJwt.fromAuthHeaderAsBearerToken(),
      ExtractJwt.fromUrlQueryParameter(AUTHENTICATION_DEFAULT_QUERY_PARAM_NAME),
    ]),
  };

  @ValidateNested()
  local: IStrategyOptionsWithRequest = {
    passReqToCallback: true,
  };
}
