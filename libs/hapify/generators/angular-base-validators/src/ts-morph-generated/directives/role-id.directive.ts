import { Directive } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";
import { RoleIdValidator } from "../validators";

@Directive({
      standalone: true,
      selector: '[pocValidateRoleId]',
      providers: [
        {
          provide: RoleIdValidator,
          useClass: RoleIdValidator,
        },
        {
          provide: NG_VALIDATORS,
          useExisting: ValidateRoleIdDirective,
          multi: true,
        },
      ],
    })
export class ValidateRoleIdDirective implements Validator {
    constructor(private roleIdValidator: RoleIdValidator) {
    }

    validate(control: AbstractControl): ValidationErrors | null {
        return this.roleIdValidator.validate(control);
    }
}
