/** ------------------------------------
 *             BooleanField
 * ------------------------------------- */

import type { BaseField } from './base-types';
import { createFieldFactory, isFieldFactory } from './factories';
import type { BaseConstraints, DefaultConstraint } from './field';

export type BooleanField = BaseField<'boolean', BooleanConstraints>;

/**
 * Constraints for BooleanField
 */
/**
 * Boolean constraints
 */
export type BooleanConstraints = BaseConstraints & DefaultConstraint<number>;

/**
 * Predicates and helpers
 */
export const createBooleanField = createFieldFactory('boolean');
export const booleanField = createBooleanField;

export const isBooleanField = isFieldFactory('boolean');
