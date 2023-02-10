import { BaseField } from '../base-field';

export abstract class BaseVirtualField extends BaseField {
  readonly isScalar = false as const;
}
