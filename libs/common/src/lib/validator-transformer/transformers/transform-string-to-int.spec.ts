/* eslint-disable max-classes-per-file */
import { plainToClass } from 'class-transformer';

import { TransformStringToInt } from './transform-string-to-int';

describe('TransformStringToInt decorator', () => {
  class Validator {
    @TransformStringToInt()
    field!: number;
  }

  it('should turn string int into int', () => {
    const value = { field: '1' };

    const validatedValue = plainToClass(Validator, value);

    expect(validatedValue.field).toEqual(1);
  });

  it('should turn int into int', () => {
    const value = { field: 1 };

    const validatedValue = plainToClass(Validator, value);

    expect(validatedValue.field).toEqual(1);
  });

  it("should return input value if it's not a int string", () => {
    const value = { field: '1.123' };

    const validatedValue = plainToClass(Validator, value);

    expect(validatedValue.field).toEqual('1.123');
  });

  it("should return input value if it's not a string", () => {
    const value = { field: true };

    const validatedValue = plainToClass(Validator, value);

    expect(validatedValue.field).toEqual(true);
  });
});
