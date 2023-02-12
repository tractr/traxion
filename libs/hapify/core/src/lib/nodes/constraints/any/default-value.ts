import type { Field } from '../../fields/field';
import { Constraint } from '../constraint';

export const DEFAULT_VALUE_CONSTRAINTS_KEY = 'defaultValue' as const;

export class DefaultValue<T> extends Constraint {
  name = DEFAULT_VALUE_CONSTRAINTS_KEY;

  defaultValue: T;

  constructor(value: T) {
    super();
    this.defaultValue = value;
  }

  canBeUsedWith(field: Field): boolean {
    if (typeof this.defaultValue === field.type) {
      return true;
    }

    return false;
  }
}
