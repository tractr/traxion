import { BaseStringField } from '../base-string-field';

export class StringBasicField extends BaseStringField {
  readonly type = 'string' as const;
  readonly subType = 'basic' as const;
}
