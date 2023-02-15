import { Inject, Injectable } from '@nestjs/common';

import { AppAbility } from './role-permission.mock';
import { CaslOptions } from '../src';
import { CASL_MODULE_OPTIONS } from '../src/casl.constant';

import { PolicyHandler } from '@trxn/common';

@Injectable()
export class PolicyHandlerClass implements PolicyHandler<AppAbility> {
  constructor(
    @Inject(CASL_MODULE_OPTIONS)
    private readonly caslOptions: CaslOptions<AppAbility>,
  ) {}

  handle() {
    return true;
  }
}
