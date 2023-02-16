import { Directive } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";
import { UserIdValidator } from "../validators";

@Directive({
      standalone: true,
      selector: '[pocValidateUserId]',
      providers: [
        {
          provide: UserIdValidator,
          useClass: UserIdValidator,
        },
        {
          provide: NG_VALIDATORS,
          useExisting: ValidateUserIdDirective,
          multi: true,
        },
      ],
    })
export class ValidateUserIdDirective implements Validator {
    constructor(private userIdValidator: UserIdValidator) {
    }

    validate(control: AbstractControl): ValidationErrors | null {
        return this.userIdValidator.validate(control);
    }
}
