import { Constraint } from '../constraint';

export const NOT_NULL_CONSTRAINTS_KEY = 'notNull' as const;

export class NotNull extends Constraint {
  name = NOT_NULL_CONSTRAINTS_KEY;
}
