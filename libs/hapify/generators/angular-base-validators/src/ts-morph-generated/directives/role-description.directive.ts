import { Directive } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";
import { RoleDescriptionValidator } from "../validators";

@Directive({
      standalone: true,
      selector: '[pocValidateRoleDescription]',
      providers: [
        {
          provide: RoleDescriptionValidator,
          useClass: RoleDescriptionValidator,
        },
        {
          provide: NG_VALIDATORS,
          useExisting: ValidateRoleDescriptionDirective,
          multi: true,
        },
      ],
    })
export class ValidateRoleDescriptionDirective implements Validator {
    constructor(private roleDescriptionValidator: RoleDescriptionValidator) {
    }

    validate(control: AbstractControl): ValidationErrors | null {
        return this.roleDescriptionValidator.validate(control);
    }
}
