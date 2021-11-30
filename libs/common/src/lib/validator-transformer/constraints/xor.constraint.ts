import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

/**
 * Constraint for validating that a property has xor relation
 * with the specified key in the constraint.
 */
@ValidatorConstraint({ name: 'xorConstraint', async: false })
export class XorConstraint implements ValidatorConstraintInterface {
  validate(
    propertyValue: string,
    { object, constraints }: ValidationArguments,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const currentObject: Record<string, any> = object;
    const constraintsList: string[] = constraints;

    if (constraintsList.length === 0)
      throw new Error('No constraints specified.');

    if (propertyValue)
      return constraintsList.every((constraint) => !currentObject[constraint]);

    return constraintsList.every((constraint) => !!currentObject[constraint]);
  }

  defaultMessage(args: ValidationArguments) {
    return `Failed XOR relation between "${args.property}" and "${args.constraints[0]}".`;
  }
}
