import { BaseField, GetConstraintsNames, HasConstraints } from '../base-types';
import { Field } from '../field';
import { hasConstraint } from '../predicates/has-constraint';

/**
 * Factory to create a function that asserts if field has a constraint by name
 *
 * @param constraintName
 * @returns Function to assert if field has a constraint
 *
 * @example
 *
 * type A = BaseField<'string', { a: string; c?: string }>;
 *
 * const hasA = hasConstraintFactory('a');
 * const hasB = hasConstraintFactory('b');
 * const hasC = hasConstraintFactory('c');
 * const hasD = hasConstraintFactory('d');
 *
 * let a: A = { type: 'string', name: 'a', a: true };
 *
 * hasA(a); // true
 * hasB(a); // false
 * hasC(a); // false
 * hasD(a); // false
 *
 * a.c = 'c';
 *
 * hasA(a); // true
 * hasB(a); // false
 * hasC(a); // true
 * hasD(a); // false
 *
 * a.a = false;
 * hasA(a); // true
 * hasB(a); // false
 * hasC(a); // true
 * hasD(a); // false
 */
export function hasConstraintFactory<
  N extends GetConstraintsNames<BaseField> = GetConstraintsNames<Field>,
>(constraintName: N) {
  return <F extends BaseField>(
    field: F,
  ): field is F extends BaseField
    ? N extends GetConstraintsNames<F>
      ? HasConstraints<F, N>
      : never
    : never => hasConstraint(field, constraintName);
}
