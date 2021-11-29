import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type OrValidator = (value: any) => boolean;

/**
 * Constraint for validating that a property has xor relation
 * with the specified key in the constraint.
 */
@ValidatorConstraint({ name: 'orConstraint', async: false })
export class OrConstraint implements ValidatorConstraintInterface {
  validate(propertyValue: string, { constraints }: ValidationArguments) {
    const constraintsList: Array<OrValidator> = constraints;

    if (constraintsList.length === 0)
      throw new Error('No constraints specified.');

    return constraintsList.some((constraint) => {
      const result = constraint(propertyValue);
      if (result === true) return true;
      if (result === false) return false;
      throw new Error('Invalid constraint.');
    });
  }

  defaultMessage(args: ValidationArguments) {
    return `Failed XOR relation between "${args.property}" and "${args.constraints[0]}".`;
  }
}
