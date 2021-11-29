import { Validate } from 'class-validator';

import { OrConstraint, OrValidator } from '../constraints';

export function Or(constraints: OrValidator[]) {
  return Validate(OrConstraint, constraints);
}
