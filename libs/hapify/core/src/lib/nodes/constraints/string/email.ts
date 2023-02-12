import { StringConstraint } from './string.constraint';

export const STRING_EMAIL_CONSTRAINTS_KEY = 'email' as const;

export class Email extends StringConstraint {
  name = STRING_EMAIL_CONSTRAINTS_KEY;

  regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  constructor(regex?: RegExp) {
    super();

    if (regex) {
      this.regex = regex;
    }
  }
}
