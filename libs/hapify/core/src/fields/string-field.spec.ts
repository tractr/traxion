import { Field } from './field';
import { createStringField, isStringField, StringField } from './string-field';

describe('createStringField', () => {
  it('should create a string field', () => {
    const field = createStringField('field');

    expect(field).toEqual({
      type: 'string',
      name: 'field',
      pluralName: 'fields',
      scalar: 'string',
    });
  });
});

it('should create a string field with the provided constraints and options', () => {
  const field = createStringField(
    'field',
    {
      isSortable: true,
    },
    { pluralName: 'test' },
  );

  expect(field).toEqual({
    type: 'string',
    name: 'field',
    pluralName: 'test',
    scalar: 'string',
    isSortable: true,
  });
});

describe('isStringField', () => {
  it('should return true if the field is a string field', () => {
    const field = {
      type: 'string',
      name: 'field',
      pluralName: 'fields',
      scalar: 'string',
    } satisfies StringField;

    expect(isStringField(field)).toBeTruthy();
  });

  it('should return false if the field is not a string field', () => {
    const field = {
      type: 'number',
      name: 'field',
      pluralName: 'fields',
      scalar: 'number',
    };

    expect(isStringField(field)).not.toBeTruthy();
  });

  it('should narrow the field type if the field is a string field', () => {
    const fields: Field[] = [
      {
        type: 'string',
        name: 'field',
        pluralName: 'fields',
        scalar: 'string',
      },
      {
        type: 'number',
        name: 'field',
        pluralName: 'fields',
        scalar: 'number',
      },
    ];

    const stringFields = fields.filter(isStringField);

    expect(stringFields).toEqual([
      {
        type: 'string',
        name: 'field',
        pluralName: 'fields',
        scalar: 'string',
      },
    ]);
  });
});
