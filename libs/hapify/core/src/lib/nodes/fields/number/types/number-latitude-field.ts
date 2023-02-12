import { Max, Min } from '../../../constraints';
import { BaseNumberField } from '../base-number-field';

export class NumberLatitudeField extends BaseNumberField {
  readonly type = 'number' as const;
  readonly subType = 'latitude' as const;

  constructor(name: string) {
    super(name);

    this.addConstraint(new Max(90));
    this.addConstraint(new Min(-90));
  }
}
