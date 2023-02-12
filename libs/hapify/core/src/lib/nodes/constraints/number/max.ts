import { NumberConstraint } from './number.constraint';

export const NUMBER_MAX_CONSTRAINTS_KEY = 'max' as const;

export class Max extends NumberConstraint {
  name = NUMBER_MAX_CONSTRAINTS_KEY;

  max: number;

  constructor(max: number) {
    super();
    this.max = max;
  }
}
