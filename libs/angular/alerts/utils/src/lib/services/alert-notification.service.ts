import { Injectable } from '@angular/core';
import { share } from 'rxjs';

import { AlertCreatedGql, AlertUpdatedGql } from '@cali/angular-graphql-client';

@Injectable()
export class AlertNotificationService {
  constructor(
    private readonly alertCreatedGql: AlertCreatedGql,
    private readonly alertUpdatedGql: AlertUpdatedGql,
  ) {}

  /**
   * Subscribe to alertCreated notifications
   * @returns an observable triggered when an alert is created
   */
  public subscribeToAlertCreation() {
    return this.alertCreatedGql.subscribe().pipe(share());
  }

  /**
   * Subscribe to alertUpdated notifications
   * @returns an observable triggered when an alert is updated
   */
  public subscribeToAlertUpdated() {
    return this.alertUpdatedGql.subscribe().pipe(share());
  }
}
