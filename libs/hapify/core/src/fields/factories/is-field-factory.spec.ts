// import modules
import { isFieldFactory } from './is-field-factory';

describe('isFieldFactory()', () => {
  // define fields
  const fields = [
    { type: 'string', name: 'a' },
    { type: 'number', name: 'b' },
    { type: 'boolean', name: 'c' },
  ];

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
});
