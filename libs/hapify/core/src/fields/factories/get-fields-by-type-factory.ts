import { BaseField } from '../base-types';
import { FieldType } from '../field';
import { getFieldsByType } from '../helpers';

/**
 * Get the fields by type from a field list
 */
export function getFieldsByTypeFactory<T extends FieldType>(type: T) {
  return <F extends BaseField[]>(fields: F) => getFieldsByType(fields, type);
}
