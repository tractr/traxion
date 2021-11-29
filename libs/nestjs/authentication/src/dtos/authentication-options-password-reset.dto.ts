import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class AuthenticationOptionsPasswordReset {
  @IsBoolean()
  active = false;

  @IsString()
  link = `/password/reset/{{id}}/{{code}}`;

  @IsString()
  subject = 'Lost password';

  @IsNumber()
  @IsOptional()
  template?: number;
}
