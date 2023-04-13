/* eslint-disable @typescript-eslint/no-explicit-any */

/** ------------------------------------
 *             PrimaryField
 * ------------------------------------- */
import type {
  BaseField,
  ConditionalConstraint,
  Constraints,
  KeyType,
} from './base-types';
import { createFieldFactory, isFieldFactory } from './factories';
import { getFieldsByTypeFactory } from './factories/get-fields-by-type-factory';
import type {
  BaseConstraints,
  RelationsConstraint,
  ScalarConstraint,
} from './field';

export type PrimaryField = BaseField<
  'primary',
  PrimaryConstraints & PrimaryMode<PrimaryConstraints>
>;

/**
 * Constraints for PrimaryField
 */
export type PrimaryConstraints = BaseConstraints &
  RelationsConstraint &
  ScalarConstraint<'string' | 'number'>;

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
export const createPrimaryField = createFieldFactory('primary');
export const primaryField = createPrimaryField;

export const isPrimaryField = isFieldFactory('primary');

export const getPrimaryFields = getFieldsByTypeFactory('primary');

/**
 * Type helpers
 */
