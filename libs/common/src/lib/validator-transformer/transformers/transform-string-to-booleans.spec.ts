/* eslint-disable max-classes-per-file */
import { plainToClass } from 'class-transformer';

import { TransformStringToBoolean } from '../../..';

describe('TransformStringToBoolean decorator', () => {
  class Validator {
    @TransformStringToBoolean()
    field!: boolean;
  }
  it('should turn string false into boolean false', () => {
    const value = { field: 'false' };

    const validatedValue = plainToClass(Validator, value);

    expect(validatedValue.field).toEqual(false);
  });

  it('should turn string true into boolean true', () => {
    const value = { field: 'true' };

    const validatedValue = plainToClass(Validator, value);

    expect(validatedValue.field).toEqual(true);
  });

  it("should return input value if it's not a boolean string", () => {
    const value = { field: 'nonBooleanString' };

    const validatedValue = plainToClass(Validator, value);

    expect(validatedValue.field).toEqual('nonBooleanString');
  });

  it("should return input value if it's not a string", () => {
    const value = { field: 123 };

    const validatedValue = plainToClass(Validator, value);

    expect(validatedValue.field).toEqual(123);
  });
});
