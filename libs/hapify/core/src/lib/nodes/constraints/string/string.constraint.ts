import type { Field } from '../../fields/field';
import { BaseStringField } from '../../fields/string/base-string-field';
import { Constraint } from '../constraint';

export const STRING_CONSTRAINTS_KEY = 'string';

export class StringConstraint extends Constraint<string> {
  name = STRING_CONSTRAINTS_KEY;

  canBeUsedWith(field: Field): boolean {
    if (field instanceof BaseStringField) {
      return true;
    }

    return false;
  }
}
