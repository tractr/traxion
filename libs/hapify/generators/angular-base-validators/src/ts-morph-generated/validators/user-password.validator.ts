import { Injectable } from "@angular/core";
import { AbstractControl, ValidationErrors, Validator, ValidatorFn } from "@angular/forms";
import { password, compose, required } from "@poc/trxn-angular-tools";

export function validateUserPassword(control: AbstractControl): ValidatorFn {
    const validationResult = compose([password, required])(control);  
            
       return validationResult === null
          ? null
          : { ...validationResult, userPassword: true };
}

@Injectable()
export class UserPasswordValidator implements Validator {
    validate(control: AbstractControl): ValidationErrors | null {
        validateUserPassword(control);
    }
}
