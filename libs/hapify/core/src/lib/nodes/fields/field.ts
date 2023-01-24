import { BooleanField } from './boolean';
import { DateField, TimeField } from './datetime';
import { EntityField } from './entity';
import { EnumField } from './enum';
import { FileField } from './file';
import { NumberField } from './number';
import { ObjectField } from './object';
import { StringField } from './string';

export type Field =
  | BooleanField
  | DateField
  | TimeField
  | EntityField
  | EnumField
  | FileField
  | NumberField
  | ObjectField
  | StringField;
