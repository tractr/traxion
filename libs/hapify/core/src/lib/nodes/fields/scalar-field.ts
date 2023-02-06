import { BaseField } from './base-field';

export abstract class ScalarField extends BaseField {
  readonly isScalar = true as const;
}
