/** ------------------------------------
 *             DateField
 * ------------------------------------- */

import type { BaseField } from './base-types';
import { createFieldFactory, isFieldFactory } from './factories';
import type { BaseConstraints, DefaultConstraint } from './field';

export type DateField = BaseField<'date', DateConstraints>;

/**
 * Constraints for DateField
 */
export type DateConstraints = BaseConstraints &
  DefaultConstraint<Date | number>;

/**
 * Predicates and helpers
 */
export const createDateField = createFieldFactory('date');
export const dateField = createDateField;

export const isDate = isFieldFactory('date');

/**
 * Type helpers
 */
