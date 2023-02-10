import { BaseScalarField } from '../base-scalar-field';

export class TimeField extends BaseScalarField {
  readonly type = 'time' as const;
  readonly subType = 'basic' as const;
}
