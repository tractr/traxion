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

export const isString = isFieldFactory('string');

export const hasMinLength = hasConstraintFactory('minLength');
export const hasMaxLength = hasConstraintFactory('maxLength');
export const hasEncryptionConstraint = hasConstraintFactory('isEncrypted');

export const isEncrypted = isConstraintFactory('isEncrypted');

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
