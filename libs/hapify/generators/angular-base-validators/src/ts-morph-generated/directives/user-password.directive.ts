import { Directive } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";
import { UserPasswordValidator } from "../validators";

@Directive({
      standalone: true,
      selector: '[pocValidateUserPassword]',
      providers: [
        {
          provide: UserPasswordValidator,
          useClass: UserPasswordValidator,
        },
        {
          provide: NG_VALIDATORS,
          useExisting: ValidateUserPasswordDirective,
          multi: true,
        },
      ],
    })
export class ValidateUserPasswordDirective implements Validator {
    constructor(private userPasswordValidator: UserPasswordValidator) {
    }

    validate(control: AbstractControl): ValidationErrors | null {
        return this.userPasswordValidator.validate(control);
    }
}
