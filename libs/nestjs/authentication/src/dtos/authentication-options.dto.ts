import { JwtModuleOptions } from '@nestjs/jwt';
import { IAuthModuleOptions } from '@nestjs/passport';
import { IsOptional, IsString, ValidateNested } from 'class-validator';

import { AuthenticationOptionsCookies } from './authentication-options-cookies.dto';
import { AuthenticationOptionsMailer } from './authentication-options-mailer.dto';
import { AuthenticationOptionsPassword } from './authentication-options-password.dto';
import { AuthenticationOptionsStrategy } from './authentication-options-strategy.dto';
import { AuthenticationOptionsUser } from './authentication-options-user.dto';

import { getDefaults } from '@tractr/common';
import { isDevelopment } from '@tractr/nestjs-core';

/**
 * Authentication module options.
 */
export class AuthenticationOptions {
  /**
   * Options to configure the user that will be manipulated by the authentication module.
   */
  @ValidateNested()
  userConfig: AuthenticationOptionsUser = getDefaults(
    AuthenticationOptionsUser,
  );

  @IsString()
  userService!: string;

  /**
   * Options to configure the password and the reset password.
   */
  @ValidateNested()
  password: AuthenticationOptionsPassword = getDefaults(
    AuthenticationOptionsPassword,
  );

  /**
   * Options to configure the jwt module (these options are used directly by the jwt module).
   */
  @ValidateNested()
  jwtModuleOptions: JwtModuleOptions = {
    secret: isDevelopment() ? 'secret' : undefined,
  };

  /**
   * Options to configure the passport module (these options are used directly by the passport module).
   */
  @ValidateNested()
  passportModuleOptions: IAuthModuleOptions = {
    defaultStrategy: 'jwt',
  };

  /**
   * Options to configure the strategies (jwt and local).
   */
  @ValidateNested()
  strategy: AuthenticationOptionsStrategy = getDefaults(
    AuthenticationOptionsStrategy,
  );

  /**
   * Options to configure how the cookies are handled.
   */
  @ValidateNested()
  cookies: AuthenticationOptionsCookies = getDefaults(
    AuthenticationOptionsCookies,
  );

  /**
   * Options to configure the mailer.
   */
  @IsOptional()
  @ValidateNested()
  mailer?: AuthenticationOptionsMailer;
}
