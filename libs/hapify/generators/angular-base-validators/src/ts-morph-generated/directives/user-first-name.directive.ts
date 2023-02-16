import { Directive } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";
import { UserFirstNameValidator } from "../validators";

@Directive({
      standalone: true,
      selector: '[pocValidateUserFirstName]',
      providers: [
        {
          provide: UserFirstNameValidator,
          useClass: UserFirstNameValidator,
        },
        {
          provide: NG_VALIDATORS,
          useExisting: ValidateUserFirstNameDirective,
          multi: true,
        },
      ],
    })
export class ValidateUserFirstNameDirective implements Validator {
    constructor(private userFirstNameValidator: UserFirstNameValidator) {
    }

    validate(control: AbstractControl): ValidationErrors | null {
        return this.userFirstNameValidator.validate(control);
    }
}
