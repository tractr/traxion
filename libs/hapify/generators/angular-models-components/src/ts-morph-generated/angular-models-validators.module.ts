import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/commons";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { AngularModelsServicesModule } from "@poc/angular-models-services";

@NgModule({
    imports: [
      CommonModule,
      ReactiveFormsModule,
      FormsModule,
      AngularModelsServicesModule,
    ],
    })
export class AngularModelsValidatorsModule {
}
