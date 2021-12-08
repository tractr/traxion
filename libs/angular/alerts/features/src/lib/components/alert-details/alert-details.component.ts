import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
} from '@angular/core';
import {
  BehaviorSubject,
  debounceTime,
  filter,
  map,
  merge,
  share,
  switchMap,
} from 'rxjs';

import { AlertPushNotificationService } from '@cali/angular-alerts-utils';
import { AlertWithCurrentFeedbackService } from '@cali/angular-rext-client';

@Component({
  selector: 'cali-alert-details',
  templateUrl: './alert-details.component.html',
  styleUrls: ['./alert-details.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertDetailsComponent implements OnChanges {
  @Input() idAlert!: string;

  alertId$ = new BehaviorSubject(this.idAlert);

  constructor(
    private alertWithCurrentFeedbackService: AlertWithCurrentFeedbackService,
    private alertPushNotificationService: AlertPushNotificationService,
  ) {}

  /** Observable who listen when the current alert is updated */
  alertUpdatedNotification$ = this.alertPushNotificationService
    .subscribeToAlertUpdated()
    .pipe(
      map(
        (alertUpdateNotification) =>
          alertUpdateNotification.data?.alertUpdated?.id,
      ),
      filter((alertId): alertId is string => alertId === this.idAlert),
    );

  /** Observable who listen when a new feedback's alert is created */
  alertFeedbackCreatedNotification$ = this.alertPushNotificationService
    .subscribeToAlertFeedbackCreation()
    .pipe(
      map(
        (feedbackCreatedNotification) =>
          feedbackCreatedNotification.data?.alertFeedbackCreated?.alertId,
      ),
      filter((alertId): alertId is string => alertId === this.idAlert),
    );

  /** Observable who get the last state of current alert with feedbacks */
  alertWithCurrentFeedbacks$ = merge(
    this.alertId$,
    this.alertUpdatedNotification$,
    this.alertFeedbackCreatedNotification$,
  ).pipe(
    debounceTime(200),
    switchMap((idAlert) =>
      this.alertWithCurrentFeedbackService.findUnique$({ id: idAlert }),
    ),
    share(),
  );

  ngOnChanges() {
    this.alertId$.next(this.idAlert);
  }
}
