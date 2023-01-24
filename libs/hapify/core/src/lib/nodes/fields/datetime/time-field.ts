import { BaseField } from '../base-field';

export class TimeField extends BaseField {
  readonly type = 'time' as const;
  readonly subType = 'basic' as const;
}
