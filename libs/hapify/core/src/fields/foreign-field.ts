/** ------------------------------------
 *             ForeignField
 * ------------------------------------- */

import type { BaseField } from './base-types';
import { createFieldFactory, isFieldFactory } from './factories';
import type { BaseConstraints, RelationConstraint } from './field';

export type ForeignField = BaseField<'foreign', ForeignConstraints>;

/**
 * Constraints for ForeignField
 */
export type ForeignConstraints = BaseConstraints & RelationConstraint;

/**
 * Predicates and helpers
 */
export const createForeignField = createFieldFactory('foreign');
export const foreignField = createForeignField;

export const isForeignField = isFieldFactory('foreign');

/**
 * Type helpers
 */
