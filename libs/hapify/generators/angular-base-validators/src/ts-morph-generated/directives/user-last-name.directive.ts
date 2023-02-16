import { Directive } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";
import { UserLastNameValidator } from "../validators";

@Directive({
      standalone: true,
      selector: '[pocValidateUserLastName]',
      providers: [
        {
          provide: UserLastNameValidator,
          useClass: UserLastNameValidator,
        },
        {
          provide: NG_VALIDATORS,
          useExisting: ValidateUserLastNameDirective,
          multi: true,
        },
      ],
    })
export class ValidateUserLastNameDirective implements Validator {
    constructor(private userLastNameValidator: UserLastNameValidator) {
    }

    validate(control: AbstractControl): ValidationErrors | null {
        return this.userLastNameValidator.validate(control);
    }
}
