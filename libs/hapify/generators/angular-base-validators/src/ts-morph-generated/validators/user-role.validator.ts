import { Injectable } from "@angular/core";
import { AbstractControl, ValidationErrors, Validator, ValidatorFn } from "@angular/forms";
import { role, compose, required } from "@poc/trxn-angular-tools";

export function validateUserRole(control: AbstractControl): ValidatorFn {
    const validationResult = compose([role, required])(control);  
            
       return validationResult === null
          ? null
          : { ...validationResult, userRole: true };
}

@Injectable()
export class UserRoleValidator implements Validator {
    validate(control: AbstractControl): ValidationErrors | null {
        validateUserRole(control);
    }
}
