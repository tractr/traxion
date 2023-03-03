import { Inject, Injectable } from '@nestjs/common';
import { Client } from 'node-mailjet';

import { MailjetModuleOptions } from '../interfaces';
import { MODULE_OPTIONS_TOKEN } from '../mailjet.module-definition';

@Injectable()
export class MailjetClient extends Client {
  sandboxMode: boolean;

  constructor(
    @Inject(MODULE_OPTIONS_TOKEN)
    mailerOptions: MailjetModuleOptions,
  ) {
    super(mailerOptions);
    this.sandboxMode = mailerOptions.sandboxMode ?? false;
  }
}
