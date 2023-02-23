/** ------------------------------------
 *             VirtualField
 * ------------------------------------- */

import type { BaseField } from './base-types';
import { createFieldFactory, isFieldFactory } from './factories';
import type { BaseConstraints, RelationConstraint } from './field';

export type VirtualField = BaseField<'virtual', VirtualConstraints>;

/**
 * Constraints for VirtualField
 */
export type VirtualConstraints = BaseConstraints & RelationConstraint;

/**
 * Predicates and helpers
 */
export const createVirtualField = createFieldFactory('virtual');
export const virtualField = createVirtualField;

export const isVirtual = isFieldFactory('virtual');

/**
 * Type helpers
 */
