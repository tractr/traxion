import { Field } from '../field';
import { EntityMultipleField } from './entity-multiple-field';

export class EntityManyToManyField extends EntityMultipleField {}

/**
 * Checks if a field is an entity many-to-many field
 */
export function isManyToMany(field: Field): field is EntityManyToManyField {
  return field instanceof EntityManyToManyField;
}
