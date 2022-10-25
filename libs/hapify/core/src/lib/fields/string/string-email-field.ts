import { StringField } from './string-field';
import { Field } from '../field';

export class StringEmailField extends StringField {}

/**
 * Checks if a field is a string email field
 */
export function email(field: Field): field is StringEmailField {
  return field instanceof StringEmailField;
}
