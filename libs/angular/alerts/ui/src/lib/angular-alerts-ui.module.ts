import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import {
  AlertDetailsUiComponent,
  AlertFilterArchivedUiComponent,
  AlertListItemUiComponent,
  AlertListUiComponent,
} from './components';

import { AngularCommonUiModule } from '@cali/angular-common-ui';

@NgModule({
  imports: [CommonModule, AngularCommonUiModule, TranslateModule, RouterModule],
  declarations: [
    AlertListItemUiComponent,
    AlertListUiComponent,
    AlertFilterArchivedUiComponent,
    AlertDetailsUiComponent,
  ],
  exports: [
    AlertListItemUiComponent,
    AlertListUiComponent,
    AlertFilterArchivedUiComponent,
    AlertDetailsUiComponent,
  ],
})
export class AngularAlertsUiModule {}
