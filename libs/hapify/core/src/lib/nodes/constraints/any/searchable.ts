import { Constraint } from '../constraint';

export const SEARCHABLE_CONSTRAINTS_KEY = 'searchable' as const;

export class Searchable extends Constraint {
  name = SEARCHABLE_CONSTRAINTS_KEY;
}
