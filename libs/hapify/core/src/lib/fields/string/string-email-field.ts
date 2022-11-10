import { Field } from '../field';
import { StringField } from './string-field';

export class StringEmailField extends StringField {}

/**
 * Checks if a field is a string email field
 */
export function isEmail(field: Field): field is StringEmailField {
  return field instanceof StringEmailField;
}
