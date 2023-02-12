import { Constraint } from '../constraint';

export const MULTIPLE_CONSTRAINTS_KEY = 'multiple' as const;

export class Multiple extends Constraint {
  name = MULTIPLE_CONSTRAINTS_KEY;
}
