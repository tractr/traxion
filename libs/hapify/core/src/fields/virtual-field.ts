/** ------------------------------------
 *             VirtualField
 * ------------------------------------- */

import type { BaseField } from './base-types';
import { createFieldFactory, isFieldFactory } from './factories';
import type {
  BaseConstraints,
  ForeignConstraint,
  RelationConstraint,
  ScalarConstraint,
} from './field';
import { ForeignField } from './foreign-field';

export type VirtualField = BaseField<'virtual', VirtualConstraints>;

/**
 * Constraints for VirtualField
 */
export type VirtualConstraints = BaseConstraints &
  RelationConstraint &
  ForeignConstraint<ForeignField[] | null> &
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
