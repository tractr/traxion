import { transformStringToArray } from './transform-string-to-array.helper';

describe('transformStringToArray', () => {
  it('should transform a string to array', () => {
    let result = transformStringToArray('test');
    expect(result).toEqual(['test']);

    result = transformStringToArray('test,foo,bar');
    expect(result).toEqual(['test', 'foo', 'bar']);

    result = transformStringToArray(JSON.stringify(['test', 'foo', 'bar']));
    expect(result).toEqual(['test', 'foo', 'bar']);
  });

  it('should return the value if it is not a string', () => {
    let result = transformStringToArray(['test', 'foo', 'bar']);
    expect(result).toEqual(['test', 'foo', 'bar']);

    result = transformStringToArray({ test: 'foo', bar: 'baz' });
    expect(result).toEqual([{ test: 'foo', bar: 'baz' }]);
  });
});
