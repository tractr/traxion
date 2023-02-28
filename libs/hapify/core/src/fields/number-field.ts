/** ------------------------------------
 *             NumberField
 * ------------------------------------- */

import type {
  BaseField,
  GetFieldWithConstraints,
  OptionalConstraint,
} from './base-types';
import {
  createFieldFactory,
  hasConstraintFactory,
  isFieldFactory,
} from './factories';
import type {
  BaseConstraints,
  DefaultConstraint,
  Field,
  FormatConstraint,
} from './field';

export type NumberField = BaseField<'number', NumberConstraints>;

/**
 * Constraints for StringField
 */
export type NumberConstraints = BaseConstraints &
  MinConstraint &
  MaxConstraint &
  NumberFormatConstraint &
  DefaultConstraint<number>;

export type MinConstraint = OptionalConstraint<'min', number>;
export type MaxConstraint = OptionalConstraint<'max', number>;
export type NumberFormatConstraint = FormatConstraint<'integer' | 'float'>;

/**
 * Predicates and helpers
 */

export const createNumberField = createFieldFactory('number');
export const numberField = createNumberField;

export const isNumberField = isFieldFactory('number');

export const hasMinConstraint = hasConstraintFactory('min');
export const hasMaxConstraint = hasConstraintFactory('max');

/**
 * Type helpers
 */

export type MinSettable<F extends BaseField> = GetFieldWithConstraints<
  F,
  MinConstraint
>;
export type MaxSettable<F extends BaseField> = GetFieldWithConstraints<
  F,
  MaxConstraint
>;
export type MinSettableField = MinSettable<Field>;
export type MaxSettableField = MaxSettable<Field>;
