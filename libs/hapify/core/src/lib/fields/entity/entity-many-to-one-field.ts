import { Field } from '../field';
import { EntityMultipleField } from './entity-multiple-field';

export class EntityManyToOneField extends EntityMultipleField {}

/**
 * Checks if a field is an entity many-to-one field
 */
export function isManyToOne(field: Field): field is EntityManyToOneField {
  return field instanceof EntityManyToOneField;
}
