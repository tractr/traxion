import { BaseNumberField } from '../base-number-field';

export class NumberIntegerField extends BaseNumberField {
  readonly type = 'number' as const;
  readonly subType = 'integer' as const;
}
