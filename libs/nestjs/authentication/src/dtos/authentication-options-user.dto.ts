import { IsObject, IsOptional, IsString } from 'class-validator';

import {
  DEFAULT_EMAIL_FIELD,
  DEFAULT_ID_FIELD,
  DEFAULT_LOGIN_FIELD,
  DEFAULT_PASSWORD_FIELD,
} from '../constants';

export class AuthenticationOptionsUser {
  /**
   * Specify the id field of the user entity
   */
  @IsString()
  idField: string = DEFAULT_ID_FIELD;

  /**
   * Specify the login field of the user entity
   */
  @IsString()
  loginField: string = DEFAULT_LOGIN_FIELD;

  /**
   * Specify the password field of the user entity
   */
  @IsString()
  passwordField: string = DEFAULT_PASSWORD_FIELD;

  /**
   * Specify the email field of the user entity
   */
  @IsString()
  emailField: string = DEFAULT_EMAIL_FIELD;

  /**
   * Allows to specify custom select rules to populate user field
   * during authentication.
   * Those fields will be accessible by the authorization layer.
   */
  @IsObject()
  @IsOptional()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customSelect?: Record<string, any>;
}
