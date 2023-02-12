import {
  Constraint,
  MULTIPLE_CONSTRAINTS_KEY,
  STRING_LABEL_CONSTRAINTS_KEY,
  UNIQUE_CONSTRAINTS_KEY,
} from '../../nodes/constraints';
import { Field } from '../../nodes/fields';

export function getConstraints(field: Field): Constraint[] {
  return Object.values(field.constraints);
}

export function getUniqueConstraint(field: Field): Constraint | undefined {
  return field.constraints[UNIQUE_CONSTRAINTS_KEY];
}

export function getLabelConstraint(field: Field): Constraint | undefined {
  return field.constraints[STRING_LABEL_CONSTRAINTS_KEY];
}

export function getMultipleConstraint(field: Field): Constraint | undefined {
  return field.constraints[MULTIPLE_CONSTRAINTS_KEY];
}
