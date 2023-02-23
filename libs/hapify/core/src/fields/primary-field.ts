/* eslint-disable @typescript-eslint/no-explicit-any */
/** ------------------------------------
 *             PrimaryField
 * ------------------------------------- */

import type {
  BaseField,
  ConditionalConstraint,
  Constraints,
  ExtractField,
  GetConstraints,
  KeyType,
  RequiredConstraint,
} from './base-types';
import { createFieldFactory, isFieldFactory } from './factories';
import type { BaseConstraints, Field, RelationsConstraint } from './field';

export type PrimaryField = BaseField<
  'primary',
  PrimaryConstraints & PrimaryMode<PrimaryConstraints>
>;

/**
 * Constraints for PrimaryField
 */
export type PrimaryConstraints = BaseConstraints &
  RelationsConstraint &
  PrimaryType;

export type PrimaryType = RequiredConstraint<'fieldType', 'string' | 'number'>;
export type PrimaryMode<C extends Constraints<KeyType, any>> =
  ConditionalConstraint<
    'mode',
    C,
    'auto',
    'increment',
    { primaryType: 'string' }
  >;

/**
 * Predicates and helpers
 */
export const createPrimaryField = createFieldFactory('primary', {}, {});
export const primaryField = createPrimaryField;

export const isPrimary = isFieldFactory('primary');

/**
 * Type helpers
 */
