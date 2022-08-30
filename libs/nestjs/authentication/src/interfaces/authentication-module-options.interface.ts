import { JwtModuleOptions } from '@nestjs/jwt';
import { IAuthModuleOptions as PassportModuleOptions } from '@nestjs/passport';
import { Prisma, User } from '@prisma/client';
import { CookieOptions } from 'express';
import { StrategyOptions as JwtStrategyOptions } from 'passport-jwt';
import { IStrategyOptionsWithRequest as LocalStrategyOptions } from 'passport-local';

export type UserInfo = {
  id: string | number;
  email: string;
  password: string;
};

/**
 * The public interface of the AuthenticationOptions.
 */
export interface AuthenticationModuleOptions {
  /**
   * Options to configure the user that will be manipulated by the authentication module.
   */
  user?: {
    fields?: {
      id?: string;
      email?: string;
      password?: string;
      login?: string;
    };

    customSelect?: Prisma.UserSelect;
  };

  /**
   * Options to configure the user service.
   */
  userService: Prisma.UserDelegate<false>;

  /**
   * Options to hash the password to be stored in the database.
   */
  generatePasswordHash?: (password: string) => Promise<string> | string;

  /**
   * Options to compare the password that is stored in the database with the password that is provided by the user.
   */
  comparePasswordHash?: (
    password: string,
    passwordHash: string,
  ) => Promise<boolean> | boolean;

  /**
   * Options to configure the information that will be stored inside the JWT
   * token.
   */
  getUserJWT?: (user: User) => Record<string, unknown>;

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
