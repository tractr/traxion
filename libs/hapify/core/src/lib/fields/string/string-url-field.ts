import { StringField } from './string-field';
import { Field } from '../field';

export class StringUrlField extends StringField {}

/**
 * Checks if a field is a string url field
 */
export function url(field: Field): field is StringUrlField {
  return field instanceof StringUrlField;
}
