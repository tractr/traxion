/* eslint-disable max-classes-per-file */
import { validate } from 'class-validator';

import { CustomValidate } from './custom-validate';

describe('CustomValidator decorator', () => {
  // Create a mock predicate
  const mockedPredicate = jest.fn();

  // Class to test the CustomValidate decorator
  class Car {
    @CustomValidate([mockedPredicate])
    brand!: string;
  }

  let car: Car;

  beforeEach(() => {
    // Create an instance of Car
    car = new Car();
    car.brand = 'Ford';

    mockedPredicate.mockReset();
  });

  it('should call the predicate function passed in parameter', async () => {
    mockedPredicate.mockReturnValue(true);

    await validate(car);

    expect(mockedPredicate).toHaveBeenCalledTimes(1);
  });

  it('should call the predicate function passed in parameter with the object being validated', async () => {
    mockedPredicate.mockReturnValue(true);

    await validate(car);

    expect(mockedPredicate).toHaveBeenCalledWith(car);
  });

  it('should return an error with a message if the predicate function passed in parameter return false', async () => {
    mockedPredicate.mockReturnValue(false);

    const errors = await validate(car);

    expect(errors[0]?.constraints?.customConstraint).toEqual(
      'Failed custom constraint on property "brand".',
    );
  });

  it('should throw an error if the predicate does not return a boolean', async () => {
    mockedPredicate.mockReturnValue('NotABoolean');

    await expect(async () => validate(car)).rejects.toThrow(
      'Invalid constraint',
    );
  });

  it('should throw an error if no predicates is passed to the decorator', () => {
    expect(() => CustomValidate([])).toThrow('No constraints specified.');
  });
});
