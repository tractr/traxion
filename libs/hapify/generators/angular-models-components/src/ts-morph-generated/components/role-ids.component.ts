import { ChangeDetectionStrategy, Component, OnInit, Optional, Self } from "@angular/core";
import { AbstractControl, FormControl, FormsModule, NgControl, ReactiveFormsModule, ValidationErrors } from "@angular/forms";
import { RoleIdValidator } from "@poc/angular-models-validators";
import { BaseControlValueAccessorComponent } from "@trxn/angular-tools";
import { RoleIdUiComponent } from "@trxn/angular-ui";
import { RoleIdValidatorModule } from "@poc/angular-models-validators";
import { CommonModule } from "@angular/common";

@Component({
        standalone: true,
        imports: [
          SelectUiComponent,
          AngularModelsValidatorsModule,
          CommonModule,
          ReactiveFormsModule,
          FormsModule,
        ],
        selector: 'poc-role-ids',
        templateUrl: './role-ids.component.html',
        styleUrls: ['./role-ids.component.less'],
        changeDetection: ChangeDetectionStrategy.OnPush,
        providers: [],
        })
export class RoleIdComponent extends BaseControlValueAccessorComponent implements OnInit {
    control: FormControl = new FormControl('');

    constructor(public roleIdValidator: RoleIdValidator, @Self() @Optional() public override ngControl?: NgControl) {
        super(ngControl);
    }

    override get validator(): (control: AbstractControl) => ValidationErrors | null {
        return this.roleIdValidator.validate;
    }
}
