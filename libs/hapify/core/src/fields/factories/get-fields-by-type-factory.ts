import { BaseField } from '../base-types';
import { FieldType } from '../field';
import { getFieldsByType } from '../helpers';

/**
 * Factory to create a function that filter a Field list by type
 *
 * @param type - Type of the field to filter
 * @returns Function to filter a Field array by type
 */
export function getFieldsByTypeFactory<T extends FieldType>(type: T) {
  return <F extends BaseField[]>(fields: F) => getFieldsByType(fields, type);
}
