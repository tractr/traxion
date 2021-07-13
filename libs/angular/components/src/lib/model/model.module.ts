import { NgModule } from '@angular/core';

import { SelectModule } from '../select/select.module';
import { ModelSelectComponent } from './select/select.component';

import { AngularToolsModule } from '@tractr/angular-tools';

@NgModule({
  imports: [AngularToolsModule, SelectModule],
  declarations: [ModelSelectComponent],
  exports: [ModelSelectComponent],
})
export class ModelModule {}
