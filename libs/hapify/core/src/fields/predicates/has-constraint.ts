import { HasConstraints, IsField, KeyType } from '../base-types';
import { hasConstraintFactory } from '../factories';
import { isField } from './is-field';

/**
 * Assert if field has a constraint by name
 * @param field
 * @param constraintName
 * @returns
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
export function hasConstraint<F, N extends KeyType>(
  field: F,
  constraintName: N,
): field is HasConstraints<IsField<F>, N> {
  return isField(field) && constraintName in field;
}
