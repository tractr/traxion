import { Constraint, StringConstraint } from '../../constraints';
import { StringConstraintType } from '../../constraints/string';
import { BaseField } from '../base-field';

/**
 * This class is tested via the children classes, especially the StringBasicField class
 */
export abstract class BaseStringField extends BaseField {
  readonly type = 'string' as const;

  public constraints: Record<string, StringConstraint> = {};

  constructor(name: string) {
    super(name);
    this.addConstraint(new StringConstraint());
  }

  addConstraint(constraint: Constraint<string>): this {
    return super.addConstraint(constraint);
  }
}
