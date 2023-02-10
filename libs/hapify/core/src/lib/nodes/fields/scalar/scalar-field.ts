import { BooleanField } from './boolean';
import { DateField, TimeField } from './datetime';
import { EnumField } from './enum';
import { FileField } from './file';
import { KeyField } from './key';
import { NumberField } from './number';
import { ObjectField } from './object';
import { StringField } from './string';

export type ScalarField =
  | BooleanField
  | DateField
  | TimeField
  | EnumField
  | FileField
  | NumberField
  | ObjectField
  | KeyField
  | StringField;
