import { Injectable } from '@nestjs/common';

import { AppAbility } from './role-permission.mock';
import { CaslAbilityFactoryService } from '../src';

import { PolicyHandler } from '@trxn/common';

@Injectable()
export class PolicyHandlerClass implements PolicyHandler<AppAbility> {
  constructor(
    private readonly caslAbilityFactoryService: CaslAbilityFactoryService,
  ) {}

  handle() {
    return true;
  }
}
