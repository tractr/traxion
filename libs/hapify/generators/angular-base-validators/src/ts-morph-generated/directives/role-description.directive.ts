import { Injectable } from "@angular/core";
import { AbstractControl, ValidationErrors, Validator, ValidatorFn } from "@angular/forms";
import { UserEmailValidator } from "../validators";

@Directive({
              selector: '[pocValidateroleDescription]',
              providers: [
                {
                  provide: NG_VALIDATORS,
                  useExisting: ValidateRoleDescriptionDirective,
                  multi: true,
                },
              ],
            })
export class ValidateRoleDescriptionDirective implements Validator {
    validate(control: AbstractControl): ValidationErrors | null {
        validateRoleDescription(control);
    }
}
