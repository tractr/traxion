/** ------------------------------------
 *             ObjectField
 * ------------------------------------- */

import { and, not } from '../operators';
import type { BaseField } from './base-types';
import {
  createFieldFactory,
  hasConstraintFactory,
  isFieldFactory,
} from './factories';
import {
  BaseConstraints,
  DefaultConstraint,
  isMultiple,
  isNull,
} from './field';

export type ObjectField = BaseField<'object', ObjectConstraints>;

/**
 * Constraints for ObjectField
 */
/**
 * Object constraints
 */
export type ObjectConstraints = BaseConstraints & DefaultConstraint<object>;

/**
 * Predicates and helpers
 */

// ObjectField
export const createObjectField = createFieldFactory('object');
export const objectField = createObjectField;

export const isObject = isFieldFactory('object');

export const hasObjectConstraint = hasConstraintFactory('object');

// ArrayField
export const createArrayField = createFieldFactory('object', {
  isMultiple: true,
  isNull: false,
});
export const arrayField = createArrayField;

export const isArray = and(isObject, isMultiple, not(isNull));
