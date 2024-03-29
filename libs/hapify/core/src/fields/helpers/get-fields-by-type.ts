import type { BaseField } from '../base-types';
import type { FieldType } from '../field';

/**
 * Get the fields by type from a field list
 */
export function getFieldsByType<T extends FieldType, F extends BaseField>(
  fields: F[],
  type: T,
): Extract<F, BaseField<T>>[] {
  return fields.filter(
    (field): field is Extract<F, BaseField<T>> => field.type === type,
  );
}
