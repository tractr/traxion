import { NgModule } from '@angular/core';

import {
  AlertNotificationService,
  AlertPushNotificationService,
} from './services';

@NgModule({
  imports: [],
  providers: [AlertPushNotificationService, AlertNotificationService],
})
export class AngularAlertsUtilsModule {}
