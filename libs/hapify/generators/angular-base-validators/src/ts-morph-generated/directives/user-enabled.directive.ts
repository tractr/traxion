import { Directive } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";
import { UserEnabledValidator } from "../validators";

@Directive({
      standalone: true,
      selector: '[pocValidateUserEnabled]',
      providers: [
        {
          provide: UserEnabledValidator,
          useClass: UserEnabledValidator,
        },
        {
          provide: NG_VALIDATORS,
          useExisting: ValidateUserEnabledDirective,
          multi: true,
        },
      ],
    })
export class ValidateUserEnabledDirective implements Validator {
    constructor(private userEnabledValidator: UserEnabledValidator) {
    }

    validate(control: AbstractControl): ValidationErrors | null {
        return this.userEnabledValidator.validate(control);
    }
}
