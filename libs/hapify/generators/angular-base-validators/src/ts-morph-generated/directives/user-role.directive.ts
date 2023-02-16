import { Injectable } from "@angular/core";
import { AbstractControl, ValidationErrors, Validator, ValidatorFn } from "@angular/forms";
import { UserEmailValidator } from "../validators";

@Directive({
              selector: '[pocValidateuserRole]',
              providers: [
                {
                  provide: NG_VALIDATORS,
                  useExisting: ValidateUserRoleDirective,
                  multi: true,
                },
              ],
            })
export class ValidateUserRoleDirective implements Validator {
    validate(control: AbstractControl): ValidationErrors | null {
        validateUserRole(control);
    }
}
