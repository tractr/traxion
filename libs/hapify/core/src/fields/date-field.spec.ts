import { createDateField, DateField, isDateField } from './date-field';
import { Field } from './field';

describe('createDateField', () => {
  it('should create a date field', () => {
    const field = createDateField('name');

    expect(field).toEqual({
      type: 'date',
      name: 'name',
      pluralName: 'names',
      scalar: 'date',
    });
  });

  it('should init the date field with the provided constraints and options', () => {
    const field = createDateField(
      'name',
      { isSortable: true },
      { pluralName: 'test' },
    );

    expect(field).toEqual({
      type: 'date',
      name: 'name',
      pluralName: 'test',
      scalar: 'date',
      isSortable: true,
    });
  });
});

describe('isDateField', () => {
  it('should return true if the field is a date field', () => {
    const field = {
      type: 'date',
      name: 'name',
      pluralName: 'names',
      scalar: 'date',
    } satisfies DateField;

    expect(isDateField(field)).toBeTruthy();
  });

  it('should return false if the field is not a date field', () => {
    const field = {
      type: 'string',
      name: 'name',
      pluralName: 'names',
      scalar: 'string',
    };

    expect(isDateField(field)).not.toBeTruthy();
  });

  it('should narrow the type of the field if it is a date field', () => {
    const fields = [
      {
        type: 'date',
        name: 'name',
        pluralName: 'names',
        scalar: 'date',
      },
    ] satisfies Field[];

    const result: DateField[] = fields.filter(isDateField);

    expect(result).toEqual(fields);
  });
});
