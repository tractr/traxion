import { EntityField } from './entity-field';
import { Field } from '../field';

export class EntityOneToOneField extends EntityField {}

/**
 * Checks if a field is an entity one-to-one field
 */
export function oneToOne(field: Field): field is EntityOneToOneField {
  return field instanceof EntityOneToOneField;
}
