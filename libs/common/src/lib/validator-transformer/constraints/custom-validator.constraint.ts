import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  validate(
    propertyValue: string,
    { targetName, constraints, object }: ValidationArguments,
  ) {
    const constraintsList: Array<IsCustomConstraint> = constraints;

    if (constraintsList.length === 0)
      throw new Error('No constraints specified.');

    return constraintsList.every((constraint) => {
      const result = constraint(object, propertyValue, targetName);
      if (result === true) return true;
      if (result === false) return false;
      throw new Error('Invalid constraint.');
    });
  }

  defaultMessage(args: ValidationArguments) {
    return `Failed custom constraint on property "${args.property}".`;
  }
}
