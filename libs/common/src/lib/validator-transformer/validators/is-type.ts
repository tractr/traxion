import { Validate } from 'class-validator';

import { IsTypeChecker, IsTypeConstraint } from '../constraints';

export function IsType(constraints: IsTypeChecker[]) {
  return Validate(IsTypeConstraint, constraints);
}
