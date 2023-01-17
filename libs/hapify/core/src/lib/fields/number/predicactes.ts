import { Field } from '../field';
import { NumberField } from './number-field';
import {
  NumberBasicField,
  NumberFloatField,
  NumberIntegerField,
  NumberLatitudeField,
  NumberLongitudeField,
} from './types';

/**
 * Checks if a field is a basic number field
 */
export function isBasicNumber(field: Field): field is NumberBasicField {
  return field instanceof NumberBasicField;
}

/**
 * Checks if a field is a number float field
 */
export function isFloat(field: Field): field is NumberFloatField {
  return field instanceof NumberFloatField;
}

/**
 * Checks if a field is a number integer field
 */
export function isInteger(field: Field): field is NumberIntegerField {
  return field instanceof NumberIntegerField;
}

/**
 * Checks if a field is a number latitude field
 */
export function isLatitude(field: Field): field is NumberLatitudeField {
  return field instanceof NumberLatitudeField;
}

/**
 * Checks if a field is a number longitude field
 */
export function isLongitude(field: Field): field is NumberLongitudeField {
  return field instanceof NumberLongitudeField;
}

/**
 * Test every number field type
 */
export function isNumber(field: Field): field is NumberField {
  return (
    isBasicNumber(field) ||
    isFloat(field) ||
    isInteger(field) ||
    isLatitude(field) ||
    isLongitude(field)
  );
}
