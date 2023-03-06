/** ------------------------------------
 *             FileField
 * ------------------------------------- */

import type { BaseField } from './base-types';
import { createFieldFactory, isFieldFactory } from './factories';
import type { BaseConstraints, ScalarConstraint } from './field';

export type FileField = BaseField<'file', FileConstraints>;

/**
 * Constraints for FileField
 */
export type FileConstraints = BaseConstraints & ScalarConstraint<'string'>;
/**
 * Predicates and helpers
 */
export const createFileField = createFieldFactory('file');
export const fileField = createFileField;

export const isFileField = isFieldFactory('file');

/**
 * Type helpers
 */
