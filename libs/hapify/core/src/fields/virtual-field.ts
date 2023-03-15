/** ------------------------------------
 *             VirtualField
 * ------------------------------------- */

import type { BaseField } from './base-types';
import { createFieldFactory, isFieldFactory } from './factories';
import type {
  BaseConstraints,
  RelationConstraint,
  ScalarConstraint,
} from './field';

export type VirtualField = BaseField<'virtual', VirtualConstraints>;

/**
 * Constraints for VirtualField
 */
export type VirtualConstraints = BaseConstraints &
  RelationConstraint &
  ScalarConstraint<null>;

/**
 * Predicates and helpers
 */
export const createVirtualField = createFieldFactory('virtual');
export const virtualField = createVirtualField;

export const isVirtualField = isFieldFactory('virtual');

/**
 * Type helpers
 */
