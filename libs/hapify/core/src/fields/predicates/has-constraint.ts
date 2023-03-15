import { BaseField, HasConstraints, KeyType } from '../base-types';

/**
 * Assert if field has a constraint by name
 * @param field The field to test for the constraint
 * @param constraintName The name of the constraint to check for
 * @returns boolean indicating whether the field contains the constraint
 *
 * @example
 *
 * type A = BaseField<'string', { a: boolean; c?: string }>;
 *
 * let a: A = { type: 'string', name: 'a', a: true };
 *
 * hasConstraint(a, 'a'); // true
 * hasConstraint(a, 'b'); // false
 * hasConstraint(a, 'c'); // false
 * hasConstraint(a, 'd'); // false
 *
 * a.c = 'c';
 *
 * hasConstraint(a, 'a'); // true
 * hasConstraint(a, 'b'); // false
 * hasConstraint(a, 'c'); // true
 * hasConstraint(a, 'd'); // false
 *
 * a.a = false;
 * hasConstraint(a, 'a'); // true
 * hasConstraint(a, 'b'); // false
 * hasConstraint(a, 'c'); // true
 * hasConstraint(a, 'd'); // false
 */
export function hasConstraint<F extends BaseField, N extends KeyType>(
  field: F,
  constraintName: N,
): field is HasConstraints<F, N> {
  return constraintName in field;
}
