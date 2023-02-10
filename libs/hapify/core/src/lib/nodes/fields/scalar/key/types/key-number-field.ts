import { BaseKeyField } from '../base-key-field';

export class KeyNumberField extends BaseKeyField {
  readonly subType = 'number' as const;
}
