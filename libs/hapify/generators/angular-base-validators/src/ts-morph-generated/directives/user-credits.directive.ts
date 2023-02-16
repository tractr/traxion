import { Directive } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";
import { UserCreditsValidator } from "../validators";

@Directive({
      standalone: true,
      selector: '[pocValidateUserCredits]',
      providers: [
        {
          provide: UserCreditsValidator,
          useClass: UserCreditsValidator,
        },
        {
          provide: NG_VALIDATORS,
          useExisting: ValidateUserCreditsDirective,
          multi: true,
        },
      ],
    })
export class ValidateUserCreditsDirective implements Validator {
    constructor(private userCreditsValidator: UserCreditsValidator) {
    }

    validate(control: AbstractControl): ValidationErrors | null {
        return this.userCreditsValidator.validate(control);
    }
}
