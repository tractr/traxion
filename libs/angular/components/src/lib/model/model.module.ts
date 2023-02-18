import { NgModule } from '@angular/core';

import { ModelSelectComponent } from './select/select.component';
import { SelectModule } from '../select/select.module';

import { AngularToolsModule } from '@trxn/angular-tools';

@NgModule({
  imports: [AngularToolsModule, SelectModule],
  declarations: [ModelSelectComponent],
  exports: [ModelSelectComponent],
})
export class ModelModule {}
