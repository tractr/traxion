import { Injectable } from "@angular/core";
import { AbstractControl, ValidationErrors, Validator, ValidatorFn } from "@angular/forms";
import { UserEmailValidator } from "../validators";

@Directive({
              selector: '[pocValidateroleName]',
              providers: [
                {
                  provide: NG_VALIDATORS,
                  useExisting: ValidateRoleNameDirective,
                  multi: true,
                },
              ],
            })
export class ValidateRoleNameDirective implements Validator {
    validate(control: AbstractControl): ValidationErrors | null {
        validateRoleName(control);
    }
}
