/* eslint-disable @typescript-eslint/no-explicit-any */
import { AbilityBuilder, subject } from '@casl/ability';

import { AppAbility, ModelSubjects } from '../types';

import { Action } from '@trxn/nestjs-casl';

export function policyFactory(
  action: Action | Action[],
  modelName: keyof ModelSubjects,
) {
  return <A extends AbilityBuilder<AppAbility>>(
    ability: A,
    toValidate: any,
  ) => {
    if (typeof toValidate !== 'undefined')
      ability.can(action, subject(modelName, toValidate));
    else ability.can(action, modelName);
  };
}
