import { stringVariants } from './string';

describe('stringVariants', () => {
  it('should exclude create each variant of a string', () => {
    const variants = stringVariants('a long String with 1234 numbers');
    expect(variants).toEqual({
      raw: 'a long String with 1234 numbers',
      kebab: 'a-long-string-with-1234-numbers',
      snake: 'a_long_string_with_1234_numbers',
      header: 'A-Long-String-With-1234-Numbers',
      constant: 'A_LONG_STRING_WITH_1234_NUMBERS',
      big: 'A-LONG-STRING-WITH-1234-NUMBERS',
      capital: 'A Long String With 1234 Numbers',
      lower: 'a long string with 1234 numbers',
      upper: 'A LONG STRING WITH 1234 NUMBERS',
      compact: 'alongstringwith1234numbers',
      pascal: 'ALongStringWith1234Numbers',
      camel: 'aLongStringWith1234Numbers',
      toString: expect.any(Function),
    });
  });
  it('should be stringifiable', () => {
    const variants = stringVariants('a long String with 1234 numbers');
    expect(variants.toString()).toEqual('a long String with 1234 numbers');
  });
});
