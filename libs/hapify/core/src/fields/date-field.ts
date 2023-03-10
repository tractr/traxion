/** ------------------------------------
 *             DateField
 * ------------------------------------- */

import type { BaseField } from './base-types';
import { createFieldFactory, isFieldFactory } from './factories';
import type {
  BaseConstraints,
  DefaultConstraint,
  ScalarConstraint,
} from './field';

export type DateField = BaseField<'date', DateConstraints>;

/**
 * Constraints for DateField
 */
export type DateConstraints = BaseConstraints &
  ScalarConstraint<'date'> &
  DefaultConstraint<Date | number>;

/**
 * Predicates and helpers
 */
export const createDateField = createFieldFactory('date');
export const dateField = createDateField;

export const isDateField = isFieldFactory('date');

/**
 * Type helpers
 */
