import { Email } from './email';
import { MaxLength } from './max-length';
import { StringConstraint } from './string.constraint';

export type StringConstraintType = StringConstraint | MaxLength | Email;
