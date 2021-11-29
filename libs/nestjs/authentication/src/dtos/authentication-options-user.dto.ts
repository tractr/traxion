import { IsString } from 'class-validator';

import {
  DEFAULT_EMAIL_FIELD,
  DEFAULT_ID_FIELD,
  DEFAULT_LOGIN_FIELD,
  DEFAULT_PASSWORD_FIELD,
} from '../constants';

export class AuthenticationOptionsUser {
  @IsString()
  idField: string = DEFAULT_ID_FIELD;

  @IsString()
  loginField: string = DEFAULT_LOGIN_FIELD;

  @IsString()
  passwordField: string = DEFAULT_PASSWORD_FIELD;

  @IsString()
  emailField: string = DEFAULT_EMAIL_FIELD;
}
