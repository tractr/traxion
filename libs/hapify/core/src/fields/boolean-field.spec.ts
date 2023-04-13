import {
  BooleanField,
  createBooleanField,
  isBooleanField,
} from './boolean-field';
import { Field } from './field';

describe('createBooleanField', () => {
  it('should create a boolean field', () => {
    const field = createBooleanField('name');

    expect(field).toEqual({
      type: 'boolean',
      name: 'name',
      pluralName: 'names',
      scalar: 'boolean',
    });
  });

  it('should init the boolean field with the provided constraints and options', () => {
    const field = createBooleanField(
      'name',
      { isSortable: true },
      { pluralName: 'test' },
    );

    expect(field).toEqual({
      type: 'boolean',
      name: 'name',
      pluralName: 'test',
      scalar: 'boolean',
      isSortable: true,
    });
  });
});

describe('isBooleanField', () => {
  it('should return true if the field is a boolean field', () => {
    const field = {
      type: 'boolean',
      name: 'name',
      pluralName: 'names',
      scalar: 'boolean',
    } satisfies BooleanField;

    expect(isBooleanField(field)).toBeTruthy();
  });

  it('should return false if the field is not a boolean field', () => {
    const field = {
      type: 'string',
      name: 'name',
      pluralName: 'names',
      scalar: 'string',
    };

    expect(isBooleanField(field)).not.toBeTruthy();
  });

  it('should narrow the field type if the field is a boolean field', () => {
    const fields = [
      {
        type: 'boolean',
        name: 'name',
        pluralName: 'names',
        scalar: 'boolean',
      },
    ] satisfies Field[];

    const result: BooleanField[] = fields.filter(isBooleanField);

    expect(result).toEqual(fields);
  });
});
