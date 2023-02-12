import { BaseField } from '../base-field';

export class BooleanField extends BaseField {
  readonly type = 'boolean' as const;
  readonly subType = 'basic' as const;
}
