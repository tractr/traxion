import { isConstraintFactory } from './is-constraint-factory';
import { Field } from '../field';
import { NumberField } from '../number-field';
import { StringField } from '../string-field';

describe('isConstraintFactory', () => {
  it('should return a function', () => {
    const constraintName = 'string';

    const result = isConstraintFactory(constraintName);

    expect(result).toBeInstanceOf(Function);
  });

  it('should accept any constraint name', () => {
    const field = {
      type: 'number',
      name: 'Age',
      pluralName: 'Ages',
      minValue: 0,
      maxValue: 1,
    };
    const isMinValue = isConstraintFactory('minValue');
    const isMaxValue = isConstraintFactory('maxValue');

    expect(isMinValue(field)).not.toBeTruthy();
    expect(isMaxValue(field)).toBeTruthy();
  });

  it('should return true if the field is truthy', () => {
    const field = {
      type: 'number',
      name: 'Age',
      pluralName: 'Ages',
      isEncrypted: true,
    };
    const isEncrypted = isConstraintFactory('isEncrypted');

    expect(isEncrypted(field)).toBeTruthy();
  });

  it('should return false if the field is not truthy', () => {
    const field = {
      type: 'number',
      name: 'Age',
      pluralName: 'Ages',
      isEncrypted: false,
    };
    const isEncrypted = isConstraintFactory('isEncrypted');

    expect(isEncrypted(field)).not.toBeTruthy();
  });

  it('should return a function that determine if the field has the constraint with a true value', () => {
    const searchableField = {
      type: 'string',
      name: 'name',
      isSearchable: true,
      isSortable: false,
    } as unknown as Field;
    const sortableField = {
      type: 'number',
      name: 'name',
      isSearchable: false,
      isSortable: true,
    } as unknown as Field;

    const searchableResult =
      isConstraintFactory('isSearchable')(searchableField);
    const notSearchableResult =
      isConstraintFactory('isSearchable')(sortableField);

    const sortableResult = isConstraintFactory('isSortable')(sortableField);
    const notSortableResult =
      isConstraintFactory('isSortable')(searchableField);

    expect(searchableResult).toEqual(true);
    expect(notSearchableResult).toEqual(false);
    expect(sortableResult).toEqual(true);
    expect(notSortableResult).toEqual(false);
  });

  it('should return a function that narrow the field type if the field has the constraint with a true value', () => {
    const searchableField = {
      type: 'string',
      name: 'name',
      isSearchable: true,
      isSortable: false,
      pluralName: 'names',
      scalar: 'string',
    } satisfies StringField;
    const sortableField = {
      type: 'number',
      name: 'name',
      isSearchable: false,
      isSortable: true,
      pluralName: 'names',
      scalar: 'number',
    } satisfies NumberField;

    const fields = [searchableField, sortableField];

    // Type has been narrowed to StringField[]
    const searchableResult: StringField[] = fields.filter(
      isConstraintFactory('isSearchable'),
    );

    // Type has been narrowed to NumberField[]
    const sortableResult: NumberField[] = fields.filter(
      isConstraintFactory('isSortable'),
    );

    expect(searchableResult).toEqual([searchableField]);
    expect(sortableResult).toEqual([sortableField]);
  });
});
