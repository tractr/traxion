import { Directive } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";
import { UserDescriptionValidator } from "../validators";

@Directive({
      standalone: true,
      selector: '[pocValidateUserDescription]',
      providers: [
        {
          provide: UserDescriptionValidator,
          useClass: UserDescriptionValidator,
        },
        {
          provide: NG_VALIDATORS,
          useExisting: ValidateUserDescriptionDirective,
          multi: true,
        },
      ],
    })
export class ValidateUserDescriptionDirective implements Validator {
    constructor(private userDescriptionValidator: UserDescriptionValidator) {
    }

    validate(control: AbstractControl): ValidationErrors | null {
        return this.userDescriptionValidator.validate(control);
    }
}
