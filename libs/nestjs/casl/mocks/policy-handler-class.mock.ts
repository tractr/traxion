import { Inject, Injectable } from '@nestjs/common';

import { CaslOptions } from '../src';
import { CASL_MODULE_OPTIONS } from '../src/casl.constant';
import { AppAbility } from './role-permission.mock';

import { PolicyHandler } from '@tractr/common';

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
