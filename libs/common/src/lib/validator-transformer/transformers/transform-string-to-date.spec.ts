/* eslint-disable max-classes-per-file */
import { plainToClass } from 'class-transformer';

import { TransformStringToDate } from './transform-string-to-date';

describe('TransformStringToDate decorator', () => {
  class Validator {
    @TransformStringToDate()
    field!: Date;
  }

  it('should turn string date into date', () => {
    const value = { field: new Date().toISOString() };

    const validatedValue = plainToClass(Validator, value);

    expect(validatedValue.field).toEqual(expect.any(Date));
  });

  it("should return input value if it's not a date string", () => {
    const value = { field: 'nonDateString' };

    const validatedValue = plainToClass(Validator, value);

    expect(validatedValue.field).toEqual('nonDateString');
  });

  it("should return input value if it's not a string", () => {
    const value = { field: 123 };

    const validatedValue = plainToClass(Validator, value);

    expect(validatedValue.field).toEqual(123);
  });
});
