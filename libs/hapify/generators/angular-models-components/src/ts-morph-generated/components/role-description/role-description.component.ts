import { ChangeDetectionStrategy, Component, OnInit, Optional, Self } from "@angular/core";
import { AbstractControl, FormControl, FormsModule, NgControl, ReactiveFormsModule, ValidationErrors } from "@angular/forms";
import { RoleDescriptionValidator } from "@poc/angular-models-validators";
import { BaseControlValueAccessorComponent } from "@trxn/angular-tools";
import { RoleDescriptionUiComponent } from "@trxn/angular-ui";
import { CommonModule } from "@angular/common";

@Component({
        standalone: true,
        imports: [
          AngularModelsValidatorsModule,
          CommonModule,
          ReactiveFormsModule,
          FormsModule,
        ],
        selector: 'poc-role-descriptions',
        templateUrl: './role-descriptions.component.html',
        changeDetection: ChangeDetectionStrategy.OnPush,
        providers: [],
        })
export class RoleDescriptionComponent extends BaseControlValueAccessorComponent implements OnInit {
    control: FormControl = new FormControl('');

    constructor(public roleDescriptionValidator: RoleDescriptionValidator, @Self() @Optional() public override ngControl?: NgControl) {
        super(ngControl);
    }

    override get validator(): (control: AbstractControl) => ValidationErrors | null {
        return this.roleDescriptionValidator.validate;
    }
}
