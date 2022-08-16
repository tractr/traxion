import { Validate } from 'class-validator';

import { CustomConstraint, IsCustomConstraint } from '../constraints';

/**
 * Accept a custom predicate in parameter that should return true
 * for the validation to pass.
 *
 * @param constraints - a predicate or an array of predicates
 */
export function CustomValidate(
  constraints: IsCustomConstraint | IsCustomConstraint[],
) {
  const constraintsList = Array.isArray(constraints)
    ? constraints
    : [constraints];

  return Validate(CustomConstraint, constraintsList);
}
