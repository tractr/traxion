import { BaseField } from './base-field';

export abstract class VirtualField extends BaseField {
  readonly isScalar = false as const;
}
