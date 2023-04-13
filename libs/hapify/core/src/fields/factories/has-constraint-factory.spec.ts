import { hasConstraintFactory } from './has-constraint-factory';
import type { Field } from '../field';
import type { NumberField } from '../number-field';
import type { StringField } from '../string-field';

describe('hasConstraintFactory', () => {
  it('should return a function', () => {
    const constraintName = 'string';

    const result = hasConstraintFactory(constraintName);

    expect(result).toBeInstanceOf(Function);
  });

  it('should return a function that determine if the field has the constraint property', () => {
    const searchableField = {
      type: 'string',
      name: 'name',
      isSearchable: false,
    } as unknown as Field;
    const sortableField = {
      type: 'number',
      name: 'name',
      isSortable: false,
    } as unknown as Field;

    const searchableResult =
      hasConstraintFactory('isSearchable')(searchableField);
    const notSearchableResult =
      hasConstraintFactory('isSearchable')(sortableField);

    const sortableResult = hasConstraintFactory('isSortable')(sortableField);
    const notSortableResult =
      hasConstraintFactory('isSortable')(searchableField);

    expect(searchableResult).toEqual(true);
    expect(notSearchableResult).toEqual(false);
    expect(sortableResult).toEqual(true);
    expect(notSortableResult).toEqual(false);
  });

  it('should return a function that narrow the field type if the field has the constraint property', () => {
    const searchableField = {
      type: 'string',
      name: 'name',
      isSearchable: false,
      pluralName: 'names',
      scalar: 'string',
    } satisfies StringField;
    const sortableField = {
      type: 'number',
      name: 'name',
      isSortable: false,
      pluralName: 'names',
      scalar: 'number',
    } satisfies NumberField;

    const fields = [searchableField, sortableField];

    // Type has been narrowed to StringField[]
    const searchableResult: StringField[] = fields.filter(
      hasConstraintFactory('isSearchable'),
    );

    // Type has been narrowed to NumberField[]
    const sortableResult: NumberField[] = fields.filter(
      hasConstraintFactory('isSortable'),
    );

    expect(searchableResult).toEqual([searchableField]);
    expect(sortableResult).toEqual([sortableField]);
  });
});
