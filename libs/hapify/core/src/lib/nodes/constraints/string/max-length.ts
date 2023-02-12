import { StringConstraint } from './string.constraint';

export const STRING_MAX_LENGTH_CONSTRAINTS_KEY = 'maxLength' as const;

export class MaxLength extends StringConstraint {
  name = STRING_MAX_LENGTH_CONSTRAINTS_KEY;

  maxLength: number;

  constructor(maxLength: number) {
    super();
    this.maxLength = maxLength;
  }
}
