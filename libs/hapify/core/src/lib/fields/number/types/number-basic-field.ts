import { BaseNumberField } from '../base-number-field';

export class NumberBasicField extends BaseNumberField {
  readonly type = 'number' as const;
  readonly subType = 'basic' as const;
}
