import { Field } from '../field';
import { StringField } from './string-field';
import {
  StringBasicField,
  StringEmailField,
  StringPasswordField,
  StringRichField,
  StringTextField,
  StringUrlField,
} from './types';

/**
 * Checks if a field is a basic string field
 */
export function isBasicString(field: Field): field is StringBasicField {
  return field instanceof StringBasicField;
}

/**
 * Checks if a field is a string email field
 */
export function isEmail(field: Field): field is StringEmailField {
  return field instanceof StringEmailField;
}

/**
 * Checks if a field is a string password field
 */
export function isPassword(field: Field): field is StringPasswordField {
  return field instanceof StringPasswordField;
}

/**
 * Checks if a field is a string rich field
 */
export function isRich(field: Field): field is StringRichField {
  return field instanceof StringRichField;
}

/**
 * Checks if a field is a string text field
 */
export function isText(field: Field): field is StringTextField {
  return field instanceof StringTextField;
}

/**
 * Checks if a field is a string url field
 */
export function isUrl(field: Field): field is StringUrlField {
  return field instanceof StringUrlField;
}

/**
 * Test every string types
 */
export function isString(field: Field): field is StringField {
  return (
    isBasicString(field) ||
    isUrl(field) ||
    isRich(field) ||
    isText(field) ||
    isEmail(field) ||
    isPassword(field)
  );
}
