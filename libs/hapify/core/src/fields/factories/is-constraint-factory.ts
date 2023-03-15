import { BaseField, GetConstraintsNames, IsConstraints } from '../base-types';
import { Field } from '../field';
import { isConstraint } from '../predicates/is-constraint';

/**
 * Factory to create a function that assert if field has a constraint by name and if it is a truthy value
 *
 * @param constraintName - Name of the constraint
 * @returns Function to assert if field has a constraint value and if it is a truthy value
 *
 * @example
 *
 * type A = BaseField<'string', { a: boolean; c?: string }>;
 *
 * const isA = isConstraintFactory('a');
 * const isB = isConstraintFactory('b');
 * const isC = isConstraintFactory('c');
 * const isD = isConstraintFactory('d');
 *
 * let a: A = { type: 'string', name: 'a', a: true };
 *
 * isA(a); // true
 * isB(a); // false
 * isC(a); // false
 * isD(a) // false
 *
 * a.c = 'c';
 * isA(a); // true
 * isB(a); // false
 * isC(a); // true
 * isD(a) // false
 *
 * a.a = false;
 * isA(a); // false
 * isB(a); // false
 * isC(a); // true
 * isD(a) // false
 */
export function isConstraintFactory<
  N extends GetConstraintsNames<BaseField> = GetConstraintsNames<Field>,
>(constraintName: N) {
  return <F extends BaseField>(
    field: F,
  ): field is F extends BaseField
    ? N extends GetConstraintsNames<F>
      ? IsConstraints<F, N>
      : never
    : never => isConstraint(field, constraintName);
}
