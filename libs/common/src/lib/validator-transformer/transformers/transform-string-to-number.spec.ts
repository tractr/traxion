/* eslint-disable max-classes-per-file */
import { plainToClass } from 'class-transformer';

import { TransformStringToNumber } from './transform-string-to-number';

describe('TransformNumberToDate decorator', () => {
  class Validator {
    @TransformStringToNumber()
    field!: Date;
  }

  it('should turn number string into int', () => {
    const value = { field: '1' };

    const validatedValue = plainToClass(Validator, value);

    expect(validatedValue.field).toEqual(1);
  });

  it('should turn number string into float', () => {
    const value = { field: '1.123' };

    const validatedValue = plainToClass(Validator, value);

    expect(validatedValue.field).toEqual(1.123);
  });

  it("should return input value if it's not a date number", () => {
    const value = { field: 'nonNumber' };

    const validatedValue = plainToClass(Validator, value);

    expect(validatedValue.field).toEqual('nonNumber');
  });

  it("should return input value if it's not a number", () => {
    const value = { field: true };

    const validatedValue = plainToClass(Validator, value);

    expect(validatedValue.field).toEqual(true);
  });
});
