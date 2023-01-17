import {
  NumberBasicField,
  NumberFloatField,
  NumberIntegerField,
  NumberLatitudeField,
  NumberLongitudeField,
} from './types';

export type NumberField =
  | NumberBasicField
  | NumberFloatField
  | NumberIntegerField
  | NumberLatitudeField
  | NumberLongitudeField;
