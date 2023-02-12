import type { Field } from '../../fields/field';
import { NumberBasicField } from '../../fields/number/types/number-basic-field';
import { Constraint } from '../constraint';

export const NUMBER_CONSTRAINTS_KEY = 'number';

export class NumberConstraint extends Constraint<number> {
  name = NUMBER_CONSTRAINTS_KEY;

  canBeUsedWith(field: Field): boolean {
    if (field instanceof NumberBasicField) {
      return true;
    }

    return false;
  }
}
