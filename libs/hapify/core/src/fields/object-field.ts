/** ------------------------------------
 *             ObjectField
 * ------------------------------------- */
import type { BaseField } from './base-types';
import {
  createFieldFactory,
  hasConstraintFactory,
  isFieldFactory,
} from './factories';
import {
  BaseConstraints,
  DefaultConstraint,
  isMultipleField,
  isNullField,
  ScalarConstraint,
} from './field';
import { and, not } from '../operators';

export type ObjectField = BaseField<'object', ObjectConstraints>;

/**
 * Constraints for ObjectField
 */
/**
 * Object constraints
 */
export type ObjectConstraints = BaseConstraints &
  DefaultConstraint<object> &
  ScalarConstraint<'object'>;

/**
 * Predicates and helpers
 */

// ObjectField
export const createObjectField = createFieldFactory('object');
export const objectField = createObjectField;

export const isObjectField = isFieldFactory('object');

export const hasObjectConstraint = hasConstraintFactory('object');

// ArrayField
export const createArrayField = createFieldFactory('object', {
  isMultiple: true,
  isNull: false,
});
export const arrayField = createArrayField;

export const isArray = and(isObjectField, isMultipleField, not(isNullField));
