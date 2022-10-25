import { EntityMultipleField } from './entity-multiple-field';
import { Field } from '../field';

export class EntityOneToManyField extends EntityMultipleField {}

/**
 * Checks if a field is an entity one-to-many field
 */
export function oneToMany(field: Field): field is EntityOneToManyField {
  return field instanceof EntityOneToManyField;
}
