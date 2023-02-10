import { BaseField } from '../base-field';

export abstract class BaseScalarField extends BaseField {
  readonly isScalar = true as const;
}
