import { definedValues, instanceOf } from './array-filters.helper';

describe('definedValues', () => {
  it('should exclude undefined values and keep falsy values', () => {
    const array = ['value1', 'value2', undefined, null, 0, false, 3];
    const result = array.filter(definedValues);
    expect(result).toEqual(['value1', 'value2', null, 0, false, 3]);
  });
});

describe('instanceOf', () => {
  it('should keep instances of a specific class', () => {
    const date = new Date();
    const map = new Map();
    const set = new Set();
    const array = [date, map, set];
    const result = array.filter(instanceOf(Date));
    expect(result).toEqual([date]);
  });
});
