import { Field } from './field';
import {
  createPrimaryField,
  isPrimaryField,
  PrimaryField,
} from './primary-field';

describe('createPrimaryField', () => {
  it('should create a primary field', () => {
    const field = createPrimaryField('field');

    expect(field).toEqual({
      type: 'primary',
      name: 'field',
      pluralName: 'fields',
      scalar: 'string',
    });
  });
});

it('should create a primary field with the provided constraints and options', () => {
  const field = createPrimaryField(
    'field',
    { isSortable: true, relations: [] },
    { pluralName: 'test' },
  );

  expect(field).toEqual({
    type: 'primary',
    name: 'field',
    pluralName: 'test',
    scalar: 'string',
    isSortable: true,
    relations: [],
  });
});

describe('isPrimaryField', () => {
  it('should return true if the field is a primary field', () => {
    const field = {
      type: 'primary',
      name: 'field',
      pluralName: 'fields',
      scalar: 'string',
      isSortable: true,
      relations: [],
    } satisfies PrimaryField;

    expect(isPrimaryField(field)).toBeTruthy();
  });

  it('should return false if the field is not a primary field', () => {
    const field = {
      type: 'string',
      name: 'field',
      pluralName: 'fields',
      scalar: 'string',
    };

    expect(isPrimaryField(field)).not.toBeTruthy();
  });

  it('should narrow the field type if the field is a primary field', () => {
    const fields: Field[] = [
      {
        type: 'primary',
        name: 'field',
        pluralName: 'fields',
        scalar: 'string',
        isSortable: true,
        relations: [],
      },
      {
        type: 'string',
        name: 'field',
        pluralName: 'fields',
        scalar: 'string',
      },
    ];

    const primaryFields: PrimaryField[] = fields.filter(isPrimaryField);

    expect(primaryFields).toEqual([
      {
        type: 'primary',
        name: 'field',
        pluralName: 'fields',
        scalar: 'string',
        isSortable: true,
        relations: [],
      },
    ]);
  });
});
