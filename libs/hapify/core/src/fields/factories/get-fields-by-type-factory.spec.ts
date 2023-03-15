import { getFieldsByTypeFactory } from './get-fields-by-type-factory';
import { BooleanField } from '../boolean-field';
import { DateField } from '../date-field';
import { EnumField } from '../enum-field';
import { Field } from '../field';
import { FileField } from '../file-field';
import { ForeignField } from '../foreign-field';
import { NumberField } from '../number-field';
import { ObjectField } from '../object-field';
import { PrimaryField } from '../primary-field';
import { StringField } from '../string-field';
import { VirtualField } from '../virtual-field';

describe('getFieldsByTypeFactory', () => {
  it('should return a function', () => {
    const type = 'string';

    const result = getFieldsByTypeFactory(type);

    expect(result).toBeInstanceOf(Function);
  });

  it('should return a function that return the fields by type from a field list', () => {
    const stringField: StringField = {
      type: 'string',
      name: 'name',
    } as unknown as StringField;
    const numberField: NumberField = {
      type: 'number',
      name: 'age',
    } as unknown as NumberField;
    const booleanField: BooleanField = {
      type: 'boolean',
      name: 'isAdult',
    } as unknown as BooleanField;
    const objectField: ObjectField = {
      type: 'object',
      name: 'address',
    } as unknown as ObjectField;
    const dateField: DateField = {
      type: 'date',
      name: 'birthDate',
    } as unknown as DateField;
    const enumField: EnumField = {
      type: 'enum',
      name: 'role',
    } as unknown as EnumField;
    const fileField: FileField = {
      type: 'file',
      name: 'avatar',
    } as unknown as FileField;
    const foreignField: ForeignField = {
      type: 'foreign',
      name: 'user',
    } as unknown as ForeignField;
    const primaryField: PrimaryField = {
      type: 'primary',
      name: 'id',
    } as unknown as PrimaryField;
    const virtualField: VirtualField = {
      type: 'virtual',
      name: 'fullName',
    } as unknown as VirtualField;

    const fields: Field[] = [
      stringField,
      numberField,
      booleanField,
      objectField,
      dateField,
      enumField,
      fileField,
      foreignField,
      primaryField,
      virtualField,
    ];

    const stringResult: StringField[] =
      getFieldsByTypeFactory('string')(fields);
    const numberResult: NumberField[] =
      getFieldsByTypeFactory('number')(fields);
    const booleanResult: BooleanField[] =
      getFieldsByTypeFactory('boolean')(fields);
    const objectResult: ObjectField[] =
      getFieldsByTypeFactory('object')(fields);
    const dateResult: DateField[] = getFieldsByTypeFactory('date')(fields);
    const enumResult: EnumField[] = getFieldsByTypeFactory('enum')(fields);
    const fileResult: FileField[] = getFieldsByTypeFactory('file')(fields);
    const foreignResult: ForeignField[] =
      getFieldsByTypeFactory('foreign')(fields);
    const primaryResult: PrimaryField[] =
      getFieldsByTypeFactory('primary')(fields);
    const virtualResult: VirtualField[] =
      getFieldsByTypeFactory('virtual')(fields);

    expect(stringResult).toEqual([stringField]);
    expect(numberResult).toEqual([numberField]);
    expect(booleanResult).toEqual([booleanField]);
    expect(objectResult).toEqual([objectField]);
    expect(dateResult).toEqual([dateField]);
    expect(enumResult).toEqual([enumField]);
    expect(fileResult).toEqual([fileField]);
    expect(foreignResult).toEqual([foreignField]);
    expect(primaryResult).toEqual([primaryField]);
    expect(virtualResult).toEqual([virtualField]);
  });
});
