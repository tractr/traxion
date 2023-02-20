import { ChangeDetectionStrategy, Component, OnInit, Optional, Self } from "@angular/core";
import { AbstractControl, FormControl, FormsModule, NgControl, ReactiveFormsModule, ValidationErrors } from "@angular/forms";
import { UserPasswordValidator } from "@poc/angular-models-validators";
import { BaseControlValueAccessorComponent } from "@trxn/angular-tools";
import { UserPasswordUiComponent } from "@trxn/angular-ui";
import { CommonModule } from "@angular/common";

@Component({
        standalone: true,
        imports: [
          AngularModelsValidatorsModule,
          CommonModule,
          ReactiveFormsModule,
          FormsModule,
        ],
        selector: 'poc-user-passwords',
        templateUrl: './user-passwords.component.html',
        changeDetection: ChangeDetectionStrategy.OnPush,
        providers: [],
        })
export class UserPasswordComponent extends BaseControlValueAccessorComponent implements OnInit {
    control: FormControl = new FormControl('');

    constructor(public userPasswordValidator: UserPasswordValidator, @Self() @Optional() public override ngControl?: NgControl) {
        super(ngControl);
    }

    override get validator(): (control: AbstractControl) => ValidationErrors | null {
        return this.userPasswordValidator.validate;
    }
}
