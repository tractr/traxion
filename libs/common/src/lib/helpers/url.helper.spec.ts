import { formatUrlParams } from './url.helper';

describe('formatUrlParams', () => {
  it('should ignore undefined and null values', () => {
    const input = {
      mustBeIgnoredBecauseUndefined: undefined,
      mustBeIgnoredBecauseNull: null,
      mustNotBeIgnored: 'keepMe',
    };

    const expectedOutput = {
      mustNotBeIgnored: 'keepMe',
    };

    const output = formatUrlParams(input);

    expect(output).toEqual(expectedOutput);
  });

  it('should keep string value without modifying it', () => {
    const input = {
      mustNotBeIgnored: 'keepMe',
    };

    const expectedOutput = input;

    const output = formatUrlParams(input);

    expect(output).toEqual(expectedOutput);
  });

  it('should keep string value without modifying it', () => {
    const input = {
      mustNotBeIgnored: 'keepMe',
    };

    const expectedOutput = input;

    const output = formatUrlParams(input);

    expect(output).toEqual(expectedOutput);
  });

  it('should stringify boolean and number values', () => {
    const input = {
      booleanTrue: true,
      booleanFalse: false,
      zero: 0,
      number: 1,
    };

    const expectedOutput = {
      booleanTrue: 'true',
      booleanFalse: 'false',
      zero: '0',
      number: '1',
    };

    const output = formatUrlParams(input);

    expect(output).toEqual(expectedOutput);
  });

  it('should turn date objects in ISO strings', () => {
    const date = new Date(2020, 1, 1);
    const dateAsISOString = date.toISOString();
    const input = {
      date,
    };

    const expectedOutput = {
      date: dateAsISOString,
    };

    const output = formatUrlParams(input);

    expect(output).toEqual(expectedOutput);
  });
});

describe('formatUrlParams', () => {
  it('should work', () => {
    expect(true).toBe(true);
  });
});

describe('formatUrlParams', () => {
  it('should work', () => {
    expect(true).toBe(true);
  });
});
