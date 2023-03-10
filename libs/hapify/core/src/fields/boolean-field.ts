/** ------------------------------------
 *             BooleanField
 * ------------------------------------- */

import type { BaseField } from './base-types';
import { createFieldFactory, isFieldFactory } from './factories';
import type {
  BaseConstraints,
  DefaultConstraint,
  ScalarConstraint,
} from './field';

export type BooleanField = BaseField<'boolean', BooleanConstraints>;

/**
 * Constraints for BooleanField
 */
/**
 * Boolean constraints
 */
export type BooleanConstraints = BaseConstraints &
  ScalarConstraint<'boolean'> &
  DefaultConstraint<number>;

/**
 * Predicates and helpers
 */
export const createBooleanField = createFieldFactory('boolean');
export const booleanField = createBooleanField;

export const isBooleanField = isFieldFactory('boolean');
