// import modules
import { isFieldFactory } from './is-field-factory';
import { NumberField } from '../number-field';
import { StringField } from '../string-field';

describe('isFieldFactory()', () => {
  // define fields
  const fields = [
    { type: 'string', name: 'a', pluralName: 'as' },
    { type: 'number', name: 'b', pluralName: 'bs' },
    { type: 'boolean', name: 'c', pluralName: 'cs' },
  ];

  it('should return a function', () => {
    const result = isFieldFactory('string');

    expect(result).toBeInstanceOf(Function);
  });

  it('should return true if a field is of specified type', () => {
    expect(isFieldFactory('string')(fields[0])).toBe(true);
    expect(isFieldFactory('number')(fields[1])).toBe(true);
    expect(isFieldFactory('boolean')(fields[2])).toBe(true);
  });

  it('should return false if a field is not of specified type', () => {
    expect(isFieldFactory('number')(fields[0])).toBe(false);
    expect(isFieldFactory('string')(fields[1])).toBe(false);
    expect(isFieldFactory('number')(fields[2])).toBe(false);
  });

  it('should return a function that narrow the field type if the field is of specified type', () => {
    const stringField = fields[0] as unknown as StringField;
    const numberField = fields[1] as unknown as NumberField;

    // Type has been narrowed to StringField[]
    const stringResult: StringField[] = fields.filter(isFieldFactory('string'));

    // Type has been narrowed to NumberField[]
    const numberResult: NumberField[] = fields.filter(isFieldFactory('number'));

    expect(stringResult).toEqual([stringField]);
    expect(numberResult).toEqual([numberField]);
  });
});
