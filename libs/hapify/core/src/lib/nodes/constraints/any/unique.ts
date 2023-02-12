import { Constraint } from '../constraint';

export const UNIQUE_CONSTRAINTS_KEY = 'unique' as const;

export class Unique extends Constraint {
  name = UNIQUE_CONSTRAINTS_KEY;
}
