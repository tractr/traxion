import { Injectable } from "@angular/core";
import { AbstractControl, ValidationErrors, Validator, ValidatorFn } from "@angular/forms";
import { id, compose, required } from "@poc/trxn-angular-tools";

export function validateRoleId(control: AbstractControl): ValidatorFn {
    const validationResult = compose([id, required])(control);  
            
       return validationResult === null
          ? null
          : { ...validationResult, roleId: true };
}

@Injectable()
export class RoleIdValidator implements Validator {
    validate(control: AbstractControl): ValidationErrors | null {
        validateRoleId(control);
    }
}
