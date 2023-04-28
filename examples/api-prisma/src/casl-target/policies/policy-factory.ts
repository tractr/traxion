/* eslint-disable @typescript-eslint/no-explicit-any */
import { subject } from '@casl/ability';

import { AppAbility, AppSubjects, ModelSubjects } from '../types';

import { Action } from '@trxn/nestjs-casl';

export function policyFactory<S extends keyof ModelSubjects>(
  action: Action | Action[],
  modelName: S,
) {
  return <A extends AppAbility>(
    ability: A,
    toValidate: ModelSubjects[S],
  ): boolean => {
    const actions = Array.isArray(action) ? action : [action];

    // Check if each action can be performed on the subject
    for (const a of actions) {
      const isAllowed =
        typeof toValidate !== 'undefined'
          ? ability.can(a, subject(modelName, toValidate))
          : ability.can(a, modelName);

      if (!isAllowed) return false;
    }

    return true;
  };
}
