import { Field } from '../field';
import { EntityMultipleField } from './entity-multiple-field';

export class EntityOneToManyField extends EntityMultipleField {}

/**
 * Checks if a field is an entity one-to-many field
 */
export function isOneToMany(field: Field): field is EntityOneToManyField {
  return field instanceof EntityOneToManyField;
}
