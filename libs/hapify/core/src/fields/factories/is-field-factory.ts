import { BaseField, GetField, GetFieldType, IsField } from '../base-types';
import { Field } from '../field';
import { isField } from '../predicates/is-field';

/**
 * Make a predicate to filter out fields by type
 * @param type
 * @returns
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
export function isFieldFactory<FT extends BaseField = Field>(
  type: GetFieldType<FT>,
) {
  return <F extends BaseField>(
    field: F,
  ): field is IsField<F> & GetField<IsField<F>, GetFieldType<F>, FT> =>
    isField(field) && field.type === type;
}
