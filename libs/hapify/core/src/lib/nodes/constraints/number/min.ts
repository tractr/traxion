import { NumberConstraint } from './number.constraint';

export const NUMBER_MIN_CONSTRAINTS_KEY = 'min' as const;

export class Min extends NumberConstraint {
  name = NUMBER_MIN_CONSTRAINTS_KEY;

  min: number;

  constructor(min: number) {
    super();
    this.min = min;
  }
}
