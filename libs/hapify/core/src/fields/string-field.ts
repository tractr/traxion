/** ------------------------------------
 *             StringField
 * ------------------------------------- */

import type {
  BaseField,
  GetFieldWithConstraints,
  OptionalConstraint,
} from './base-types';
import {
  createFieldFactory,
  hasConstraintFactory,
  isConstraintFactory,
  isFieldFactory,
} from './factories';
import type {
  BaseConstraints,
  DefaultConstraint,
  Field,
  FormatConstraint,
  ScalarConstraint,
} from './field';

export type StringField = BaseField<'string', StringConstraints>;

/**
 * Constraints for StringField
 */
export type StringConstraints = BaseConstraints &
  MinLengthConstraint &
  MaxLengthConstraint &
  EncryptionConstraint &
  StringFormatConstraint &
  ScalarConstraint<'string'> &
  DefaultConstraint<string>;

export type MinLengthConstraint = OptionalConstraint<'minLength', number>;
export type MaxLengthConstraint = OptionalConstraint<'maxLength', number>;
export type EncryptionConstraint = OptionalConstraint<'isEncrypted', boolean>;
export type StringFormatConstraint = FormatConstraint<
  'email' | 'url' | 'ip' | 'uuid' | RegExp
>;

/**
 * Predicates and helpers
 */
// StringField
export const createStringField = createFieldFactory('string');
export const stringField = createStringField;

export const isStringField = isFieldFactory('string');

export const hasMinLengthConstraint = hasConstraintFactory('minLength');
export const hasMaxLengthConstraint = hasConstraintFactory('maxLength');
export const hasEncryptionConstraint = hasConstraintFactory('isEncrypted');

export const isEncryptedField = isConstraintFactory('isEncrypted');

/**
 * Type helpers
 */
export type MinLengthSettable<F extends BaseField> = GetFieldWithConstraints<
  F,
  MinLengthConstraint
>;
export type MaxLengthSettable<F extends BaseField> = GetFieldWithConstraints<
  F,
  MaxLengthConstraint
>;
export type IsEncryptedSettable<F extends BaseField> = GetFieldWithConstraints<
  F,
  MaxLengthConstraint
>;

export type MinLengthSettableField = MinLengthSettable<Field>;
export type MaxLengthSettableField = MaxLengthSettable<Field>;
export type IsEncryptedSettableField = IsEncryptedSettable<Field>;
