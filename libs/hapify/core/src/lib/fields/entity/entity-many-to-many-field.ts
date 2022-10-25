import { EntityMultipleField } from './entity-multiple-field';
import { Field } from '../field';

export class EntityManyToManyField extends EntityMultipleField {}

/**
 * Checks if a field is an entity many-to-many field
 */
export function manyToMany(field: Field): field is EntityManyToManyField {
  return field instanceof EntityManyToManyField;
}
