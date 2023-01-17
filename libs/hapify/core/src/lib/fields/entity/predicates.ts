import { Field } from '../field';
import { EntityField } from './entity-field';
import {
  EntityManyToManyField,
  EntityManyToOneField,
  EntityOneToManyField,
  EntityOneToOneField,
} from './types';

/**
 * Checks if a field is an entity many-to-many field
 */
export function isManyToMany(field: Field): field is EntityManyToManyField {
  return field instanceof EntityManyToManyField;
}

/**
 * Checks if a field is an entity many-to-one field
 */
export function isManyToOne(field: Field): field is EntityManyToOneField {
  return field instanceof EntityManyToOneField;
}

/**
 * Checks if a field is an entity one-to-many field
 */
export function isOneToMany(field: Field): field is EntityOneToManyField {
  return field instanceof EntityOneToManyField;
}

/**
 * Checks if a field is an entity one-to-one field
 */
export function isOneToOne(field: Field): field is EntityOneToOneField {
  return field instanceof EntityOneToOneField;
}

/**
 * Test every entity field type
 */
export function isEntity(field: Field): field is EntityField {
  return (
    isOneToOne(field) ||
    isManyToOne(field) ||
    isOneToMany(field) ||
    isManyToMany(field)
  );
}
