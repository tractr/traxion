import { Directive } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";
import { UserEmailValidator } from "../validators";

@Directive({
      standalone: true,
      selector: '[pocValidateUserEmail]',
      providers: [
        {
          provide: UserEmailValidator,
          useClass: UserEmailValidator,
        },
        {
          provide: NG_VALIDATORS,
          useExisting: ValidateUserEmailDirective,
          multi: true,
        },
      ],
    })
export class ValidateUserEmailDirective implements Validator {
    constructor(private userEmailValidator: UserEmailValidator) {
    }

    validate(control: AbstractControl): ValidationErrors | null {
        return this.userEmailValidator.validate(control);
    }
}
