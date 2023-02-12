import { Email } from '../../../constraints/string/email';
import { BaseStringField } from '../base-string-field';

export class StringEmailField extends BaseStringField {
  readonly type = 'string' as const;
  readonly subType = 'email' as const;

  constructor(name: string) {
    super(name);
    this.addConstraint(new Email());
  }
}
