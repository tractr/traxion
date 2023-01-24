import { BaseStringField } from '../base-string-field';

export class StringEmailField extends BaseStringField {
  readonly type = 'string' as const;
  readonly subType = 'email' as const;
}
