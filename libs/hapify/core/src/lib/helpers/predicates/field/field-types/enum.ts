import { EnumField, Field } from '../../../../nodes';

/**
 * Checks if a field is an enum field
 */
export function isEnum(field: Field): field is EnumField {
  return field.type === 'enum';
}
