import { Directive } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";
import { UserRoleValidator } from "../validators";

@Directive({
      standalone: true,
      selector: '[pocValidateUserRole]',
      providers: [
        {
          provide: UserRoleValidator,
          useClass: UserRoleValidator,
        },
        {
          provide: NG_VALIDATORS,
          useExisting: ValidateUserRoleDirective,
          multi: true,
        },
      ],
    })
export class ValidateUserRoleDirective implements Validator {
    constructor(private userRoleValidator: UserRoleValidator) {
    }

    validate(control: AbstractControl): ValidationErrors | null {
        return this.userRoleValidator.validate(control);
    }
}
