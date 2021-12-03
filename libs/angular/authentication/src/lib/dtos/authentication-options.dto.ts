import { ClassConstructor } from 'class-transformer';
import { ValidateNested } from 'class-validator';

import { AuthenticationOptionsApi } from './authentication-options-api.dto';
import { AuthenticationOptionsLogin } from './authentication-options-login.dto';
import { AuthenticationOptionsLogout } from './authentication-options-logout.dto';
import { AuthenticationOptionsPassword } from './authentication-options-password';
import { AuthenticationOptionsRouting } from './authentication-options-routing.dto';
import { AuthenticationOptionsSession } from './authentication-options-session.dto';

import { getDefaults } from '@tractr/common';

/**
 * Authentication module options.
 */
export class AuthenticationOptions<
  U extends Record<string, unknown> = Record<string, unknown>,
  CCU extends ClassConstructor<U> = ClassConstructor<U>,
> {
  /**
   * Options to configure the user that will be manipulated by the authentication module.
   */
  @ValidateNested()
  api!: AuthenticationOptionsApi;

  /**
   * Options to configure the user that will be manipulated by the authentication module.
   */
  user!: CCU;

  /**
   * Options to configure the rooting url of the components.
   */
  @ValidateNested()
  routing: AuthenticationOptionsRouting = getDefaults(
    AuthenticationOptionsRouting,
  );

  /**
   * Options to configure the login url.
   */
  @ValidateNested()
  login: AuthenticationOptionsLogin = getDefaults(AuthenticationOptionsLogin);

  /**
   * Options to configure the logout url.
   */
  @ValidateNested()
  logout: AuthenticationOptionsLogout = getDefaults(
    AuthenticationOptionsLogout,
  );

  /**
   * Options to configure the session url.
   */
  @ValidateNested()
  session: AuthenticationOptionsSession = getDefaults(
    AuthenticationOptionsSession,
  );

  /**
   * Options to configure the password and the reset url.
   */
  @ValidateNested()
  password: AuthenticationOptionsPassword = getDefaults(
    AuthenticationOptionsPassword,
  );
}
