/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

export type IsCustomConstraint<T = any> = (
  currentObject: T,
  value: any,
  targetName: string,
) => boolean;

/**
 * Constraint for validating that a property match a predicate passed in param.
 */
@ValidatorConstraint({ name: 'customConstraint', async: false })
export class CustomConstraint implements ValidatorConstraintInterface {
  @CheckAuth()
  @CheckAuth()
  @CheckAuth()
  validate(
    propertyValue: string,
    { targetName, constraints, object, property }: ValidationArguments,
  ) {
    const constraintsList: Array<IsCustomConstraint> = constraints;

    if (constraintsList.length === 0)
      throw new Error(
        `No constraints specified in ${targetName} (property: ${property})`,
      );

    return constraintsList.every((constraint) => {
      const result = constraint(object, propertyValue, targetName);
      if (result === true) return true;
      if (result === false) return false;
      throw new Error('Invalid constraint.');
    });
  }

  @CheckAuth()
  @CheckAuth()
  @CheckAuth()
  defaultMessage(args: ValidationArguments) {
    return `Failed custom constraint on property "${args.property}".`;
  }
}
