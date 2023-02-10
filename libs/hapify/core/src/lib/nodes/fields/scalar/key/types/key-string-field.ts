import { BaseKeyField } from '../base-key-field';

export class KeyStringField extends BaseKeyField {
  readonly subType = 'string' as const;
}
