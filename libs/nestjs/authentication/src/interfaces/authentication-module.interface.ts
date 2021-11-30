import { JwtModuleOptions } from '@nestjs/jwt';
import { IAuthModuleOptions } from '@nestjs/passport';

import {
  AuthenticationOptionsCookies,
  AuthenticationOptionsMailer,
  AuthenticationOptionsPassword,
  AuthenticationOptionsStrategy,
  AuthenticationOptionsUser,
} from '../dtos';

/**
 * The public interface of the AuthenticationOptions.
 */
export interface AuthenticationPublicOptions {
  /**
   * Options to configure the user that will be manipulated by the authentication module.
   */
  userConfig?: AuthenticationOptionsUser;

  /**
   * Options to configure the user service.
   */
  userService: string;

  /**
   * Options to configure the password and the reset password.
   */
  password?: AuthenticationOptionsPassword;

  /**
   * Options to configure the jwt module (these options are used directly by the jwt module).
   */
  jwtModuleOptions?: JwtModuleOptions;

  /**
   * Options to configure the passport module (these options are used directly by the passport module).
   */
  passportModuleOptions?: IAuthModuleOptions;

  /**
   * Options to configure the strategies (jwt and local).
   */
  strategy?: AuthenticationOptionsStrategy;

  /**
   * Options to configure how the cookies are handled.
   */
  cookies?: AuthenticationOptionsCookies;

  /**
   * Options to configure the mailer.
   */
  mailer?: AuthenticationOptionsMailer;
}
