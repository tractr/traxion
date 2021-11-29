import { Validate } from 'class-validator';

import { XorConstraint } from '../constraints';

export function XorValidate(constraints: string[]) {
  return Validate(XorConstraint, constraints);
}
