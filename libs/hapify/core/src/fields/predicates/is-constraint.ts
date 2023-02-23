import { and } from '../../operators';
import { BaseField, IsConstraints, IsField, KeyType } from '../base-types';
import { hasConstraint } from './has-constraint';
import { isField } from './is-field';

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
export function isConstraint<F, N extends KeyType>(
  field: F,
  constraintName: N,
): field is IsConstraints<IsField<F>, N> {
  return hasConstraint(field, constraintName) && !!field[constraintName];
}
