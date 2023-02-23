/** ------------------------------------
 *             FileField
 * ------------------------------------- */

import type { BaseField } from './base-types';
import { createFieldFactory, isFieldFactory } from './factories';
import type { BaseConstraints } from './field';

export type FileField = BaseField<'file', FileConstraints>;

/**
 * Constraints for FileField
 */
export type FileConstraints = BaseConstraints;

/**
 * Predicates and helpers
 */
export const createFileField = createFieldFactory('file');
export const fileField = createFileField;

export const isFile = isFieldFactory('file');

/**
 * Type helpers
 */
