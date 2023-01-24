import {
  Field,
  StringBasicField,
  StringEmailField,
  StringField,
  StringPasswordField,
  StringRichField,
  StringTextField,
  StringUrlField,
} from '../../../nodes';

/**
 * Checks if a field is a basic string field
 */
export function isBasicString(field: Field): field is StringBasicField {
  return field.type === 'string' && field.subType === 'basic';
}

/**
 * Checks if a field is a string email field
 */
export function isEmail(field: Field): field is StringEmailField {
  return field.type === 'string' && field.subType === 'email';
}

/**
 * Checks if a field is a string password field
 */
export function isPassword(field: Field): field is StringPasswordField {
  return field.type === 'string' && field.subType === 'password';
}

/**
 * Checks if a field is a string rich field
 */
export function isRich(field: Field): field is StringRichField {
  return field.type === 'string' && field.subType === 'rich';
}

/**
 * Checks if a field is a string text field
 */
export function isText(field: Field): field is StringTextField {
  return field.type === 'string' && field.subType === 'text';
}

/**
 * Checks if a field is a string url field
 */
export function isUrl(field: Field): field is StringUrlField {
  return field.type === 'string' && field.subType === 'url';
}

/**
 * Test every string types
 */
export function isString(field: Field): field is StringField {
  return field.type === 'string';
}
