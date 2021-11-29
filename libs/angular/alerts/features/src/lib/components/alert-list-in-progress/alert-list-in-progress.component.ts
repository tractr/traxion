/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  concatMap,
  debounceTime,
  filter,
  from,
  map,
  merge,
  mergeMap,
  Observable,
  scan,
  share,
} from 'rxjs';

import { AlertNotificationService } from '@cali/angular-alerts-utils';
import { AlertWithCurrentFeedbackService } from '@cali/angular-rext-client';
import { AlertWithCurrentFeedback } from '@cali/common-models';

enum EventType {
  created = 'created',
  updated = 'updated',
}

/**
 * Type of a alert created event
 */
type AlertCreated = {
  eventType: EventType.created;
  alert: AlertWithCurrentFeedback;
};

/**
 * Type of a alert updated
 */
type AlertUpdated = {
  eventType: EventType.updated;
  alert: AlertWithCurrentFeedback;
};

/**
 * Type of an alert event
 */
type AlertEvent = AlertCreated | AlertUpdated;

@Component({
  selector: 'cali-alert-list-in-progress',
  templateUrl: './alert-list-in-progress.component.html',
  styleUrls: ['./alert-list-in-progress.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertListInProgressComponent {
  constructor(
    private readonly alertNotificationService: AlertNotificationService,
    private readonly alertWithCurrentFeedbackService: AlertWithCurrentFeedbackService,
  ) {}

  /**
   * Observable that emits the initial alerts
   */
  public alertInit$: Observable<AlertCreated> =
    this.alertWithCurrentFeedbackService
      .findMany$({
        isArchived: false,
        skip: 0,
        take: 100,
        sort: 'createdAt',
        order: 'asc',
      })
      .pipe(
        mergeMap((alerts) =>
          from(alerts).pipe(
            map((alert) => ({
              eventType: EventType.created as const,
              alert,
            })),
          ),
        ),
      );

  /**
   * Observable that emits created alerts
   */
  public alertCreated$: Observable<AlertCreated> = this.alertNotificationService
    .subscribeToAlertCreation()
    .pipe(
      map((result) => result?.data?.alertCreated?.id),
      filter((id): id is string => typeof id !== 'undefined'),
      // TODO: handle errors
      concatMap((id) =>
        this.alertWithCurrentFeedbackService.findUnique$({ id }).pipe(
          map((alert) => ({
            eventType: EventType.created as const,
            alert,
          })),
        ),
      ),
    );

  /**
   * Observable that emits updated alerts
   */
  public alertUpdated$: Observable<AlertUpdated> = this.alertNotificationService
    .subscribeToAlertUpdated()
    .pipe(
      map((result) => result?.data?.alertUpdated?.id),
      filter((id): id is string => typeof id !== 'undefined'),
      // TODO: handle errors
      concatMap((id) =>
        this.alertWithCurrentFeedbackService.findUnique$({ id }).pipe(
          map((alert) => ({
            eventType: EventType.updated as const,
            alert,
          })),
        ),
      ),
    );

  /**
   * List of alerts sync via push notifications
   */
  public alerts$: Observable<AlertWithCurrentFeedback[]> = merge(
    this.alertInit$,
    this.alertCreated$,
    this.alertUpdated$,
  ).pipe(
    scan(this.updateAlertsList, [] as AlertWithCurrentFeedback[]),
    debounceTime(100),
    share(),
  );

  /**
   * Alerts reducer function. If an alert is created, it is inserted at the head of the list.
   * If an alert is updated, it is updated in the list.
   *
   * @param alerts - alert list
   * @param alertEvent - alert event that should update the list
   * @returns the updated list of alerts
   */
  public updateAlertsList(
    this: void,
    alerts: AlertWithCurrentFeedback[],
    { eventType, alert }: AlertEvent,
  ) {
    switch (eventType) {
      case EventType.created: {
        return [alert, ...alerts];
      }
      case EventType.updated: {
        const alertToUpdateIndex = alerts.findIndex(
          (existingAlert) => existingAlert.id === alert.id,
        );
        return [...alerts].splice(alertToUpdateIndex, 1, alert);
      }
      default:
        throw new Error('Unknown event type');
    }
  }
}
