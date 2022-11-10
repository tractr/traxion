import { Field } from '../field';
import { StringField } from './string-field';

export class StringTextField extends StringField {}

/**
 * Checks if a field is a string text field
 */
export function isText(field: Field): field is StringTextField {
  return field instanceof StringTextField;
}
