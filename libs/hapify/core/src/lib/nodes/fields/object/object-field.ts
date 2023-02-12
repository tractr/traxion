import { BaseField } from '../base-field';

export class ObjectField extends BaseField {
  readonly type = 'object' as const;
  readonly subType = 'basic' as const;
}
