import { ClassConstructor } from 'class-transformer';

import {
  AuthenticationOptionsApi,
  AuthenticationOptionsLogin,
  AuthenticationOptionsLogout,
  AuthenticationOptionsPassword,
  AuthenticationOptionsRouting,
  AuthenticationOptionsSession,
} from '../dtos';

export interface AuthenticationPublicOptions {
  /**
   * Options to configure the user that will be manipulated by the authentication module.
   */
  api: AuthenticationOptionsApi;

  /**
   * Options to configure the rooting url of the components.
   */
  routing?: AuthenticationOptionsRouting;

  /**
   * Options to configure the login url.
   */
  login?: AuthenticationOptionsLogin;

  /**
   * Options to configure the logout url.
   */
  logout?: AuthenticationOptionsLogout;

  /**
   * Options to configure the session url.
   */
  session?: AuthenticationOptionsSession;

  /**
   * Options to configure the password and the reset url.
   */
  password?: AuthenticationOptionsPassword;
}

export interface UserOptions<
  U extends Record<string, unknown> = Record<string, unknown>,
  CCU extends ClassConstructor<U> = ClassConstructor<U>,
> {
  user: CCU;
}
