import { Directive } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";
import { RoleNameValidator } from "../validators";

@Directive({
      standalone: true,
      selector: '[pocValidateRoleName]',
      providers: [
        {
          provide: RoleNameValidator,
          useClass: RoleNameValidator,
        },
        {
          provide: NG_VALIDATORS,
          useExisting: ValidateRoleNameDirective,
          multi: true,
        },
      ],
    })
export class ValidateRoleNameDirective implements Validator {
    constructor(private roleNameValidator: RoleNameValidator) {
    }

    validate(control: AbstractControl): ValidationErrors | null {
        return this.roleNameValidator.validate(control);
    }
}
