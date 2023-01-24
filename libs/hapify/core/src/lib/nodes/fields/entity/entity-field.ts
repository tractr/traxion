import {
  EntityManyToManyField,
  EntityManyToOneField,
  EntityOneToManyField,
  EntityOneToOneField,
} from './types';

export type EntityField =
  | EntityOneToOneField
  | EntityManyToOneField
  | EntityOneToManyField
  | EntityManyToManyField;
