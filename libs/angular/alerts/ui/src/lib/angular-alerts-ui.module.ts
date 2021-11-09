import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import {
  AlertFilterArchivedComponent,
  AlertListComponent,
  AlertListItemComponent,
  AlertTabsComponent,
} from './components';

import { AngularCommonUiModule } from '@cali/angular-common-ui';

@NgModule({
  imports: [CommonModule, AngularCommonUiModule, TranslateModule],
  declarations: [
    AlertTabsComponent,
    AlertListItemComponent,
    AlertListComponent,
    AlertFilterArchivedComponent,
  ],
})
export class AngularAlertsUiModule {}
