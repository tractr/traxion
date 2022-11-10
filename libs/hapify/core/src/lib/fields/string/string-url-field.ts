import { Field } from '../field';
import { StringField } from './string-field';

export class StringUrlField extends StringField {}

/**
 * Checks if a field is a string url field
 */
export function isUrl(field: Field): field is StringUrlField {
  return field instanceof StringUrlField;
}
