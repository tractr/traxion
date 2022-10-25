import { StringField } from './string-field';
import { Field } from '../field';

export class StringRichField extends StringField {}

/**
 * Checks if a field is a string rich field
 */
export function rich(field: Field): field is StringRichField {
  return field instanceof StringRichField;
}
