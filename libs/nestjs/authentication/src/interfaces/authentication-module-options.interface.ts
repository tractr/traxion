import { JwtModuleOptions } from '@nestjs/jwt';
import { IAuthModuleOptions as PassportModuleOptions } from '@nestjs/passport';
import { CookieOptions } from 'express';
import { StrategyOptions as JwtStrategyOptions } from 'passport-jwt';
import { IStrategyOptionsWithRequest as LocalStrategyOptions } from 'passport-local';

import { MinimalUser, User } from '@trxn/nestjs-user';

export type UserInfo = {
  id: string | number;
  email: string;
  password: string;
};

/**
 * The public interface of the AuthenticationOptions.
 */
export interface AuthenticationModuleOptions {
  customSelect?: Record<string, unknown>;

  /**
   * Options to configure the information that will be stored inside the JWT
   * token.
   */
  transformJwtPayload?: <U extends User = MinimalUser>(
    payload: Record<string, unknown>,
    user: U,
  ) => Record<string, unknown>;

  /**
   * Options to configure the jwt module (these options are used directly by the jwt module).
   */
  jwtModuleOptions: JwtModuleOptions;

  /**
   * Options to configure the passport module (these options are used directly by the passport module).
   */
  passportModuleOptions?: PassportModuleOptions;

  /**
   * Options to configure the strategies (jwt and local).
   */
  strategy?: {
    jwt: JwtStrategyOptions;
    local: Omit<LocalStrategyOptions, 'passReqToCallback'>;
  };

  /**
   * Options to configure how the cookies are handled.
   */
  cookies?: {
    cookieName?: string;
    queryParamName?: string;
    options?: CookieOptions;
  };
}
