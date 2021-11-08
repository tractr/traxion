import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { AlertFilterArchivedComponent } from './alert-filter-archived/alert-filter-archived.component';
import { AlertListItemComponent } from './alert-list-item/alert-list-item.component';
import { AlertListComponent } from './alert-list/alert-list.component';
import { AlertTabsComponent } from './alert-tabs/alert-tabs.component';

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
