import { StringConstraint } from './string.constraint';

export const STRING_LABEL_CONSTRAINTS_KEY = 'label' as const;

export class Label extends StringConstraint {
  name = STRING_LABEL_CONSTRAINTS_KEY;
}
