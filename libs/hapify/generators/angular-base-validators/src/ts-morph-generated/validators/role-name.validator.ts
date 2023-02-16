import { Injectable } from "@angular/core";
import { AbstractControl, ValidationErrors, Validator, ValidatorFn } from "@angular/forms";
import { name, compose, required } from "@poc/trxn-angular-tools";

export function validateRoleName(control: AbstractControl): ValidatorFn {
    const validationResult = compose([name, required])(control);  
            
       return validationResult === null
          ? null
          : { ...validationResult, roleName: true };
}

@Injectable()
export class RoleNameValidator implements Validator {
    validate(control: AbstractControl): ValidationErrors | null {
        validateRoleName(control);
    }
}
