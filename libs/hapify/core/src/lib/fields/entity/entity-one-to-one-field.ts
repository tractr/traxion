import { Field } from '../field';
import { EntityField } from './entity-field';

export class EntityOneToOneField extends EntityField {}

/**
 * Checks if a field is an entity one-to-one field
 */
export function isOneToOne(field: Field): field is EntityOneToOneField {
  return field instanceof EntityOneToOneField;
}
