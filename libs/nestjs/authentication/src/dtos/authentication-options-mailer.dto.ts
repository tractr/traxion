import { IsString, ValidateNested } from 'class-validator';

import { MailerPublicOptions } from '@tractr/nestjs-mailer';

export class AuthenticationOptionsMailer {
  @IsString()
  name!: string;

  @IsString()
  from!: string;

  @ValidateNested()
  moduleOptions!: MailerPublicOptions;
}
