/* eslint-disable max-classes-per-file */
import { plainToClass } from 'class-transformer';

import { TransformStringToArray } from './transform-string-to-array';

describe('TransformStringToArray decorator', () => {
  class Validator {
    @TransformStringToArray()
    field!: string | unknown[];
  }
  it('should turn string array into array', () => {
    const value = { field: 'false,true' };

    const validatedValue = plainToClass(Validator, value);

    expect(validatedValue.field).toEqual(['false', 'true']);
  });

  it('should return array of input value', () => {
    const value = { field: 'nonArrayString' };

    const validatedValue = plainToClass(Validator, value);

    expect(validatedValue.field).toEqual(['nonArrayString']);
  });

  it('should return array', () => {
    const value = { field: 123 };

    const validatedValue = plainToClass(Validator, value);

    expect(validatedValue.field).toEqual([123]);
  });
});
