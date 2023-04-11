import { Field } from './field';
import { createNumberField, isNumberField, NumberField } from './number-field';

describe('createNumberField', () => {
  it('should create a number field', () => {
    const field = createNumberField('field');

    expect(field).toEqual({
      type: 'number',
      name: 'field',
      pluralName: 'fields',
      scalar: 'number',
    });
  });

  it('should create a number field with the provided constraints and options', () => {
    const field = createNumberField(
      'field',
      {
        isSortable: true,
      },
      { pluralName: 'test' },
    );

    expect(field).toEqual({
      type: 'number',
      name: 'field',
      pluralName: 'test',
      scalar: 'number',
      isSortable: true,
    });
  });
});

describe('isNumberField', () => {
  it('should return true if the field is a number field', () => {
    const field = {
      type: 'number',
      name: 'field',
      pluralName: 'fields',
      scalar: 'number',
    } satisfies NumberField;

    expect(isNumberField(field)).toBeTruthy();
  });

  it('should return false if the field is not a number field', () => {
    const field = {
      type: 'string',
      name: 'field',
      pluralName: 'fields',
      scalar: 'string',
    };

    expect(isNumberField(field)).not.toBeTruthy();
  });

  it('should narrow the field type if the field is a number field', () => {
    const fields: Field[] = [
      {
        type: 'number',
        name: 'field',
        pluralName: 'fields',
        scalar: 'number',
      },
      {
        type: 'string',
        name: 'name',
        pluralName: 'names',
        scalar: 'string',
      },
    ];

    const numberFields: NumberField[] = fields.filter(isNumberField);

    expect(numberFields).toEqual([
      {
        type: 'number',
        name: 'field',
        pluralName: 'fields',
        scalar: 'number',
      },
    ]);
  });
});
