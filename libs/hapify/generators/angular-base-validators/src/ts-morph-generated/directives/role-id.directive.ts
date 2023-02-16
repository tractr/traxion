import { Injectable } from "@angular/core";
import { AbstractControl, ValidationErrors, Validator, ValidatorFn } from "@angular/forms";
import { UserEmailValidator } from "../validators";

@Directive({
              selector: '[pocValidateroleId]',
              providers: [
                {
                  provide: NG_VALIDATORS,
                  useExisting: ValidateRoleIdDirective,
                  multi: true,
                },
              ],
            })
export class ValidateRoleIdDirective implements Validator {
    validate(control: AbstractControl): ValidationErrors | null {
        validateRoleId(control);
    }
}
