/** ------------------------------------
 *             EnumField
 * ------------------------------------- */

import type {
  BaseField,
  EnumType,
  GetFieldWithConstraints,
  RequiredConstraint,
} from './base-types';
import {
  createFieldFactory,
  hasConstraintFactory,
  isFieldFactory,
} from './factories';
import type { BaseConstraints, DefaultConstraint } from './field';

export type EnumField = BaseField<'enum', EnumConstraints>;

/**
 * Constraints for EnumField
 */
export type EnumConstraints = BaseConstraints &
  EnumConstraint &
  DefaultConstraint<EnumType>;

export type EnumConstraint = RequiredConstraint<'enum', EnumType>;

/**
 * Predicates and helpers
 */
export const createEnumField = createFieldFactory('enum');
export const enumField = createEnumField;

export const isEnum = isFieldFactory('enum');

export const hasEnumConstraint = hasConstraintFactory('enum');

/**
 * Type helpers
 */
export type EnumSettable<F extends BaseField> = GetFieldWithConstraints<
  F,
  EnumConstraint
>;
