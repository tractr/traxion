import { EnumType } from './base-types';
import { createEnumField, EnumField, isEnumField } from './enum-field';
import { Field } from './field';

describe('createEnumField', () => {
  it('should create an enum field', () => {
    const field = createEnumField('name');

    expect(field).toEqual({
      type: 'enum',
      name: 'name',
      pluralName: 'names',
      scalar: 'string',
    });
  });

  it('should init the enum field with the provided constraints and options', () => {
    const enumValue = {
      name: 'enum',
      values: { test: 'test' },
    } satisfies EnumType;

    const field = createEnumField(
      'name',
      { isSortable: true, enum: enumValue },
      { pluralName: 'test' },
    );

    expect(field).toEqual({
      type: 'enum',
      name: 'name',
      pluralName: 'test',
      scalar: 'string',
      enum: {
        name: 'enum',
        values: { test: 'test' },
      },
      isSortable: true,
    });
  });
});

describe('isEnumField', () => {
  it('should return true if the field is an enum field', () => {
    const enumValue = {
      name: 'enum',
      values: { test: 'test' },
    } satisfies EnumType;

    const field = {
      type: 'enum',
      name: 'name',
      pluralName: 'names',
      scalar: 'string',
      enum: enumValue,
    } satisfies EnumField;

    expect(isEnumField(field)).toBeTruthy();
  });

  it('should return false if the field is not an enum field', () => {
    const field = {
      type: 'string',
      name: 'name',
      pluralName: 'names',
      scalar: 'string',
    };

    expect(isEnumField(field)).not.toBeTruthy();
  });

  it('should narrow the type of the field if it is an enum field', () => {
    const enumValue = {
      name: 'enum',
      values: { test: 'test' },
    } satisfies EnumType;

    const fields = [
      {
        type: 'enum',
        name: 'name',
        pluralName: 'names',
        scalar: 'string',
        enum: enumValue,
      },
      {
        type: 'string',
        name: 'name',
        pluralName: 'names',
        scalar: 'string',
      },
    ] satisfies Field[];

    const enumFields: EnumField[] = fields.filter(isEnumField);

    expect(enumFields).toEqual([
      {
        type: 'enum',
        name: 'name',
        pluralName: 'names',
        scalar: 'string',
        enum: enumValue,
      },
    ]);
  });
});
