import { IsBoolean, IsString } from 'class-validator';

export class AuthenticationOptionsPassword {
  @IsBoolean()
  active = true;

  @IsString()
  resetUrl = 'password/reset';
}
