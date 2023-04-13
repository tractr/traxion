import { Field } from './field';
import { createObjectField, isObjectField, ObjectField } from './object-field';

describe('createObjectField', () => {
  it('should create an object field', () => {
    const field = createObjectField('field');

    expect(field).toEqual({
      type: 'object',
      name: 'field',
      pluralName: 'fields',
      scalar: 'object',
    });
  });

  it('should create an object field with the provided constraints and options', () => {
    const field = createObjectField(
      'field',
      {
        isSortable: true,
      },
      { pluralName: 'test' },
    );

    expect(field).toEqual({
      type: 'object',
      name: 'field',
      pluralName: 'test',
      scalar: 'object',
      isSortable: true,
    });
  });
});

describe('isObjectField', () => {
  it('should return true if the field is an object field', () => {
    const field = {
      type: 'object',
      name: 'field',
      pluralName: 'fields',
      scalar: 'object',
    } satisfies ObjectField;

    expect(isObjectField(field)).toBeTruthy();
  });

  it('should return false if the field is not an object field', () => {
    const field = {
      type: 'string',
      name: 'field',
      pluralName: 'fields',
      scalar: 'string',
    };

    expect(isObjectField(field)).not.toBeTruthy();
  });

  it('should narrow the field type if the field is an object field', () => {
    const fields = [
      {
        type: 'object',
        name: 'field',
        pluralName: 'fields',
        scalar: 'object',
      },
      {
        type: 'string',
        name: 'name',
        pluralName: 'names',
        scalar: 'string',
      },
    ] satisfies Field[];

    const result: ObjectField[] = fields.filter(isObjectField);

    expect(result).toEqual([
      {
        type: 'object',
        name: 'field',
        pluralName: 'fields',
        scalar: 'object',
      },
    ]);
  });
});
