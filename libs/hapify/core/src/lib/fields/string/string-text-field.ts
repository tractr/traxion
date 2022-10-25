import { StringField } from './string-field';
import { Field } from '../field';

export class StringTextField extends StringField {}

/**
 * Checks if a field is a string text field
 */
export function text(field: Field): field is StringTextField {
  return field instanceof StringTextField;
}
