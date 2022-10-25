import { EntityMultipleField } from './entity-multiple-field';
import { Field } from '../field';

export class EntityManyToOneField extends EntityMultipleField {}

/**
 * Checks if a field is an entity many-to-one field
 */
export function manyToOne(field: Field): field is EntityManyToOneField {
  return field instanceof EntityManyToOneField;
}
