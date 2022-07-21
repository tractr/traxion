/* eslint-disable max-classes-per-file */
import { validate } from 'class-validator';

import { CustomValidate } from './custom-validate';

describe('CustomValidator decorator', () => {
  // Create a mock predicate
  const mockedPredicate = jest.fn();

  // Class to test the CustomValidate decorator
  class CustomValidateClass {
    @CustomValidate([mockedPredicate])
    foo!: string;
  }

  let customValidateClass: CustomValidateClass;

  beforeEach(() => {
    // Create an instance of CustomValidateClass
    customValidateClass = new CustomValidateClass();
    customValidateClass.foo = 'Ford';

    mockedPredicate.mockReset();
  });

  it('should call the predicate function passed in parameter', async () => {
    mockedPredicate.mockReturnValue(true);

    await validate(customValidateClass);

    expect(mockedPredicate).toHaveBeenCalledTimes(1);
  });

  it('should call the predicate function passed in parameter with the object being validated', async () => {
    mockedPredicate.mockReturnValue(true);

    await validate(customValidateClass);

    expect(mockedPredicate).toHaveBeenCalledWith(
      customValidateClass,
      'Ford',
      'CustomValidateClass',
    );
  });

  it('should return an error with a message if the predicate function passed in parameter return false', async () => {
    mockedPredicate.mockReturnValue(false);

    const errors = await validate(customValidateClass);

    expect(errors[0]?.constraints?.customConstraint).toEqual(
      'Failed custom constraint on property "foo".',
    );
  });

  it('should throw an error if the predicate does not return a boolean', async () => {
    mockedPredicate.mockReturnValue('NotABoolean');

    await expect(async () => validate(customValidateClass)).rejects.toThrow(
      'Invalid constraint',
    );
  });

  it('should throw an error if no predicates is passed to the decorator', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    class CustomValidateClassWithoutPredicate {
      @CustomValidate([])
      foo!: string;
    }

    customValidateClass = new CustomValidateClassWithoutPredicate();

    await expect(async () => validate(customValidateClass)).rejects.toThrow(
      'No constraints specified in CustomValidateClassWithoutPredicate (property: foo)',
    );
  });
});
