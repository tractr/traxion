import { Injectable } from "@angular/core";
import { AbstractControl, ValidationErrors, Validator, ValidatorFn } from "@angular/forms";
import { id, compose, required } from "@poc/trxn-angular-tools";

export function validateUserId(control: AbstractControl): ValidatorFn {
    const validationResult = compose([id, required])(control);  
            
       return validationResult === null
          ? null
          : { ...validationResult, userId: true };
}

@Injectable()
export class UserIdValidator implements Validator {
    validate(control: AbstractControl): ValidationErrors | null {
        validateUserId(control);
    }
}
