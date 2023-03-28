import { createFieldFactory } from './create-field-factory';
import { PrimaryField } from '..';
import { BooleanField } from '../boolean-field';
import { DateField } from '../date-field';
import { EnumField } from '../enum-field';
import { FieldType } from '../field';
import { FileField } from '../file-field';
import { ForeignField } from '../foreign-field';
import { NumberField } from '../number-field';
import { ObjectField } from '../object-field';
import { StringField } from '../string-field';
import { VirtualField } from '../virtual-field';

describe('createFieldFactory', () => {
  it('should return a function', () => {
    const type = 'string';
    const defaultConstraints = {};
    const defaultOptions = {};

    const result = createFieldFactory(type, defaultConstraints, defaultOptions);

    expect(result).toBeInstanceOf(Function);
  });

  it('should return a function that initialize a field with a strict type', () => {
    const defaultConstraints = {};
    const defaultOptions = {};
    const [
      createStringField,
      createNumberField,
      createBooleanField,
      createObjectField,
      createDateField,
      createEnumField,
      createFileField,
      createForeignField,
      createPrimaryField,
      createVirtualField,
    ] = (
      [
        'string',
        'number',
        'boolean',
        'object',
        'date',
        'enum',
        'file',
        'foreign',
        'primary',
        'virtual',
      ] satisfies FieldType[]
    ).map((type) =>
      createFieldFactory(type, defaultConstraints, defaultOptions),
    );

    const stringField: StringField = createStringField('name');
    const numberField: NumberField = createNumberField('name');
    const booleanField: BooleanField = createBooleanField('name');
    const objectField: ObjectField = createObjectField('name');
    const dateField: DateField = createDateField('name');
    const enumField: EnumField = createEnumField('name');
    const fileField: FileField = createFileField('name');
    const foreignField: ForeignField = createForeignField('name');
    const primaryField: PrimaryField = createPrimaryField('name');
    const virtualField: VirtualField = createVirtualField('name');

    expect(stringField.type).toEqual('string');
    expect(numberField.type).toEqual('number');
    expect(booleanField.type).toEqual('boolean');
    expect(objectField.type).toEqual('object');
    expect(dateField.type).toEqual('date');
    expect(enumField.type).toEqual('enum');
    expect(fileField.type).toEqual('file');
    expect(foreignField.type).toEqual('foreign');
    expect(primaryField.type).toEqual('primary');
    expect(virtualField.type).toEqual('virtual');
  });

  it('should return a function that initialize a field with the correct name', () => {
    const type = 'string';
    const defaultConstraints = {};
    const defaultOptions = {};
    const name = 'name';

    const createStringField = createFieldFactory(
      type,
      defaultConstraints,
      defaultOptions,
    );

    const result = createStringField(name);

    expect(result.name).toBeDefined();
    expect(result.name).toEqual(name);
  });

  it('should return a function that initialize a field with the correct scalar type', () => {
    const typesToScalarMapping = [
      ['string', 'string'],
      ['number', 'number'],
      ['boolean', 'boolean'],
      ['object', 'object'],
      ['date', 'date'],
      ['enum', 'string'],
      ['file', 'string'],
      ['foreign', 'string'],
      ['primary', 'string'],
      ['virtual', 'object'],
    ] as const;

    const defaultConstraints = {};
    const defaultOptions = {};

    typesToScalarMapping.forEach(([type, scalar]) => {
      const createStringField = createFieldFactory(
        type,
        defaultConstraints,
        defaultOptions,
      );
      const result = createStringField('name');

      expect(result.scalar).toBeDefined();
      expect(result.scalar).toEqual(scalar);
    });
  });

  it('should return a function that initialize a field with a default plural name if none is provided', () => {
    const type = 'string';
    const defaultConstraints = {};
    const defaultOptions = {};

    const createStringField = createFieldFactory(
      type,
      defaultConstraints,
      defaultOptions,
    );

    const result = createStringField('name');

    expect(result.pluralName).toBeDefined();
    expect(result.pluralName).toEqual('names');
  });

  it('should return a function that initialize a field with the provided plural name', () => {
    const type = 'string';
    const defaultConstraints = {};
    const defaultOptions = {
      pluralName: 'test',
    };

    const createStringField = createFieldFactory(
      type,
      defaultConstraints,
      defaultOptions,
    );

    const result = createStringField('name');

    expect(result.pluralName).toBeDefined();
    expect(result.pluralName).toEqual('test');
  });

  it('should return a function that initialize a field with the default constraints', () => {
    const type = 'string';
    const defaultConstraints = {
      isSearchable: true,
    };
    const defaultOptions = {};

    const createStringField = createFieldFactory(
      type,
      defaultConstraints,
      defaultOptions,
    );

    const result = createStringField('name');

    expect(result.isSearchable).toBeDefined();
    expect(result.isSearchable).toEqual(true);
  });

  it('should return a function that initialize a field with the custom constraints if provided', () => {
    const type = 'string';
    const defaultConstraints = {
      isSearchable: true,
    };
    const defaultOptions = {};

    const createStringField = createFieldFactory(
      type,
      defaultConstraints,
      defaultOptions,
    );

    const result = createStringField('name', { isSearchable: false });

    expect(result.isSearchable).toBeDefined();
    expect(result.isSearchable).toEqual(false);
  });

  it('should return a function that initialize a field with the default options', () => {
    const type = 'string';
    const defaultConstraints = {};
    const defaultOptions = { notes: 'default notes' };

    const createStringField = createFieldFactory(
      type,
      defaultConstraints,
      defaultOptions,
    );

    const result = createStringField('name');

    expect(result.notes).toBeDefined();
    expect(result.notes).toEqual('default notes');
  });

  it('should return a function that initialize a field with the custom options if provided', () => {
    const type = 'string';
    const defaultConstraints = {};
    const defaultOptions = { notes: 'default notes' };

    const createStringField = createFieldFactory(
      type,
      defaultConstraints,
      defaultOptions,
    );

    const result = createStringField('name', {}, { notes: 'custom notes' });

    expect(result.notes).toBeDefined();
    expect(result.notes).toEqual('custom notes');
  });
});
