import { AbstractControl, ValidatorFn } from "@angular/forms";
import { compose } from "@poc/trxn-angular-tools";

export function validateUserEmail(control: AbstractControl): ValidatorFn {

      const validationResult = compose([])(control);  
            
      return validationResult === null
        ? null
        : { ...validationResult, userEmail: true };
}
