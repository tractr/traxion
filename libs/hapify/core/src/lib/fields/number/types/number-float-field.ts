import { BaseNumberField } from '../base-number-field';

export class NumberFloatField extends BaseNumberField {
  readonly type = 'number' as const;
  readonly subType = 'float' as const;
}
