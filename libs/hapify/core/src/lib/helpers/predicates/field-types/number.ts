import {
  Field,
  NumberBasicField,
  NumberField,
  NumberFloatField,
  NumberIntegerField,
  NumberLatitudeField,
  NumberLongitudeField,
} from '../../../nodes';

/**
 * Checks if a field is a basic number field
 */
export function isBasicNumber(field: Field): field is NumberBasicField {
  return field.type === 'number' && field.subType === 'basic';
}

/**
 * Checks if a field is a number float field
 */
export function isFloat(field: Field): field is NumberFloatField {
  return field.type === 'number' && field.subType === 'float';
}

/**
 * Checks if a field is a number integer field
 */
export function isInteger(field: Field): field is NumberIntegerField {
  return field.type === 'number' && field.subType === 'integer';
}

/**
 * Checks if a field is a number latitude field
 */
export function isLatitude(field: Field): field is NumberLatitudeField {
  return field.type === 'number' && field.subType === 'latitude';
}

/**
 * Checks if a field is a number longitude field
 */
export function isLongitude(field: Field): field is NumberLongitudeField {
  return field.type === 'number' && field.subType === 'longitude';
}

/**
 * Test every number field type
 */
export function isNumber(field: Field): field is NumberField {
  return field.type === 'number';
}
