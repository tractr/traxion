import { BaseStringField } from '../base-string-field';

export class StringUrlField extends BaseStringField {
  readonly type = 'string' as const;
  readonly subType = 'url' as const;
}
