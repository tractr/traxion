/** ------------------------------------
 *             ForeignField
 * ------------------------------------- */

import type { BaseField } from './base-types';
import { createFieldFactory, isFieldFactory } from './factories';
import type {
  BaseConstraints,
  RelationConstraint,
  ScalarConstraint,
} from './field';

export type ForeignField = BaseField<'foreign', ForeignConstraints>;

/**
 * Constraints for ForeignField
 */
export type ForeignConstraints = BaseConstraints &
  RelationConstraint &
  ScalarConstraint<'string' | 'number'>;

/**
 * Predicates and helpers
 */
export const createForeignField = createFieldFactory('foreign');
export const foreignField = createForeignField;

export const isForeignField = isFieldFactory('foreign');

/**
 * Type helpers
 */
