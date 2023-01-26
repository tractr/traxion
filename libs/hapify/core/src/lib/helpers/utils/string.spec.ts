import {
  big,
  camel,
  capital,
  compact,
  constant,
  header,
  kebab,
  lower,
  pascal,
  sentence,
  snake,
  stringVariants,
  title,
  upper,
} from './string';

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
      title: 'A Long String With 1234 Numbers',
      sentence: 'A long string with 1234 numbers',
      toString: expect.any(Function),
    });
  });
  it('should be stringifiable', () => {
    const variants = stringVariants('a long String with 1234 numbers');
    expect(variants.toString()).toEqual('a long String with 1234 numbers');
  });
});

describe('kebab', () => {
  it('should convert a string to kebab case', () => {
    expect(kebab('a long String with 1234 numbers')).toEqual(
      'a-long-string-with-1234-numbers',
    );
  });
});

describe('snake', () => {
  it('should convert a string to snake case', () => {
    expect(snake('a long String with 1234 numbers')).toEqual(
      'a_long_string_with_1234_numbers',
    );
  });
});

describe('header', () => {
  it('should convert a string to header case', () => {
    expect(header('a long String with 1234 numbers')).toEqual(
      'A-Long-String-With-1234-Numbers',
    );
  });
});

describe('constant', () => {
  it('should convert a string to constant case', () => {
    expect(constant('a long String with 1234 numbers')).toEqual(
      'A_LONG_STRING_WITH_1234_NUMBERS',
    );
  });
});

describe('big', () => {
  it('should convert a string to big case', () => {
    expect(big('a long String with 1234 numbers')).toEqual(
      'A-LONG-STRING-WITH-1234-NUMBERS',
    );
  });
});

describe('capital', () => {
  it('should convert a string to sentence case', () => {
    expect(capital('a long String with 1234 numbers')).toEqual(
      'A Long String With 1234 Numbers',
    );
  });
});

describe('lower', () => {
  it('should convert a string to lower case', () => {
    expect(lower('a long String with 1234 numbers')).toEqual(
      'a long string with 1234 numbers',
    );
  });
});

describe('upper', () => {
  it('should convert a string to upper case', () => {
    expect(upper('a long String with 1234 numbers')).toEqual(
      'A LONG STRING WITH 1234 NUMBERS',
    );
  });
});

describe('compact', () => {
  it('should convert a string to compact case', () => {
    expect(compact('a long String with 1234 numbers')).toEqual(
      'alongstringwith1234numbers',
    );
  });
});

describe('pascal', () => {
  it('should convert a string to pascal case', () => {
    expect(pascal('a long String with 1234 numbers')).toEqual(
      'ALongStringWith1234Numbers',
    );
  });
});

describe('camel', () => {
  it('should convert a string to camel case', () => {
    expect(camel('a long String with 1234 numbers')).toEqual(
      'aLongStringWith1234Numbers',
    );
  });
});

describe('title', () => {
  it('should convert a string to pascal case', () => {
    expect(title('a long String with 1234 numbers')).toEqual(
      'A Long String With 1234 Numbers',
    );
  });
});

describe('sentence', () => {
  it('should convert a string to sentence case', () => {
    expect(sentence('a long String with 1234 numbers')).toEqual(
      'A long string with 1234 numbers',
    );
  });
});
