import { IsNumber, IsOptional, ValidateNested } from 'class-validator';

import { AuthenticationOptionsPasswordReset } from './authentication-options-password-reset.dto';

import { getDefaults } from '@tractr/common';

export class AuthenticationOptionsPassword {
  @IsNumber()
  @IsOptional()
  saltRounds = 10;

  @ValidateNested()
  @IsOptional()
  reset: AuthenticationOptionsPasswordReset = getDefaults(
    AuthenticationOptionsPasswordReset,
  );
}
