/* istanbul ignore file */
import { Controller, Get } from '@nestjs/common';

import { PolicyHandlerClass } from './policy-handler-class.mock';
import { AppAbility } from './role-permission.mock';

import { PolicyHandlerType } from '@trxn/common';
import { Policies, Public } from '@trxn/nestjs-core';

@Controller()
export class CaslEndPointMock {
  @Get('/read-user')
  @Policies((ability: AppAbility) => ability.can('read', 'User'))
  noGuest(): string {
    return 'never';
  }

  @Get('/read-admin')
  @Policies((ability: AppAbility) => ability.can('update', 'User'))
  onlyAdmin(): string {
    return 'never';
  }

  @Get('/read-guest')
  @Policies((ability: AppAbility) => ability.can('read', 'Right'))
  needToBeGuest(): string {
    return 'never';
  }

  @Get('/with-policy-handler-as-class')
  @Policies(PolicyHandlerClass)
  policyWithClass(): string {
    return 'never';
  }

  @Get('/with-wrong-policy-handler')
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  @Policies('string' as unknown as PolicyHandlerType<unknown>)
  policyWithWrongPolicyHandler(): string {
    return 'never';
  }

  @Get('/with-no-policy-handler')
  policyWithNoPolicyHandler(): string {
    return 'never';
  }

  @Get('/with-public')
  @Public()
  public(): string {
    return 'never';
  }
}
