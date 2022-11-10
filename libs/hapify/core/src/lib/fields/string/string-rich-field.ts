import { Field } from '../field';
import { StringField } from './string-field';

export class StringRichField extends StringField {}

/**
 * Checks if a field is a string rich field
 */
export function isRich(field: Field): field is StringRichField {
  return field instanceof StringRichField;
}
