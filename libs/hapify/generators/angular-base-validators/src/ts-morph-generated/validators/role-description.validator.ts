import { Injectable } from "@angular/core";
import { AbstractControl, ValidationErrors, Validator, ValidatorFn } from "@angular/forms";
import { description, compose, required } from "@poc/trxn-angular-tools";

export function validateRoleDescription(control: AbstractControl): ValidatorFn {
    const validationResult = compose([description, required])(control);  
            
       return validationResult === null
          ? null
          : { ...validationResult, roleDescription: true };
}

@Injectable()
export class RoleDescriptionValidator implements Validator {
    validate(control: AbstractControl): ValidationErrors | null {
        validateRoleDescription(control);
    }
}
