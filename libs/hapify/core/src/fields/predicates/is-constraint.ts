import { BaseField, IsConstraints, KeyType } from '../base-types';

/**
 * Assert if field has a constraint by name and if it is a truthy value
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
 * isConstraint(a, 'a'); // true
 * isConstraint(a, 'b'); // false
 * isConstraint(a, 'c'); // false
 * isConstraint(a, 'd'); // false
 *
 * a.c = 'c';
 * isConstraint(a, 'a'); // true
 * isConstraint(a, 'b'); // false
 * isConstraint(a, 'c'); // true
 * isConstraint(a, 'd'); // false
 *
 * a.a = false;
 * isConstraint(a, 'a'); // false
 * isConstraint(a, 'b'); // false
 * isConstraint(a, 'c'); // true
 * isConstraint(a, 'd'); // false
 */
export function isConstraint<F extends BaseField, N extends KeyType>(
  field: F,
  constraintName: N,
): field is IsConstraints<F, N> {
  return !!field[constraintName];
}
