import type {
  BaseField,
  ExtractField,
  GetFieldType,
  IsField,
} from '../base-types';
import type { Field } from '../field';
import { isField } from '../predicates';

/**
 * Make a predicate to filter out fields by type
 *
 * @param type - Type of the field to filter
 * @returns Predicate to filter out fields by type
 *
 * @example
 *
 * type Field = StringField | NumberField | BooleanField;
 *
 * const fields = [
 *   { type: 'string', name: 'a' },
 *   { type: 'number', name: 'b' },
 *   { type: 'string', name: 'c' },
 * ];
 *
 * const strings: StringField[] = fields.filter(isFieldFactory<Field>('string'));
 */
export function isFieldFactory<T extends string = GetFieldType<Field>>(
  type: T,
) {
  return <F extends BaseField>(
    field: F,
  ): field is IsField<F> & ExtractField<T> =>
    isField(field) && field.type === type;
}
