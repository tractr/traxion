import { Max, Min } from '../../../constraints';
import { BaseNumberField } from '../base-number-field';

export class NumberLongitudeField extends BaseNumberField {
  readonly type = 'number' as const;
  readonly subType = 'longitude' as const;

  constructor(name: string) {
    super(name);

    this.addConstraint(new Max(180));
    this.addConstraint(new Min(-180));
  }
}
