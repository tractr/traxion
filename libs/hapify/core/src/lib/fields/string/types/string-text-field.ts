import { BaseStringField } from '../base-string-field';

export class StringTextField extends BaseStringField {
  readonly type = 'string' as const;
  readonly subType = 'text' as const;
}
