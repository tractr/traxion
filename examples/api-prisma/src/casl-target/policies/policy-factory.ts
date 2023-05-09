/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnyAbility, subject } from '@casl/ability';

import { Action } from '@trxn/nestjs-casl';

export function policyFactory<S extends string>(
  action: Action | Action[],
  modelName: S,
) {
  return <A extends AnyAbility, V extends Record<PropertyKey, any>>(
    ability: A,
    toValidate: V,
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
