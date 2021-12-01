import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { map, merge, Observable, Subject, switchMap } from 'rxjs';

import { AlertFeedbackService } from '@cali/angular-rext-client';
import { AlertFeedback } from '@cali/common-models';

@Component({
  selector: 'cali-feedback-details',
  templateUrl: './feedback-details.component.html',
  styleUrls: ['./feedback-details.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackDetailsComponent {
  constructor(private alertFeedbackService: AlertFeedbackService) {}

  @Input() idAlert!: string;

  /** Subject use to know when a new feedback alert is created */
  feedbackCreationNotification$: Subject<AlertFeedback> =
    new Subject<AlertFeedback>();

  /** Observable who get the last feedback's alert at loading of component */
  feedbackInitialization$: Observable<AlertFeedback> = this.alertFeedbackService
    .findMany$({
      alert: this.idAlert,
      sort: 'createdAt',
      order: 'desc',
      take: 1,
      skip: 0,
    })
    .pipe(map((feedbacks: AlertFeedback[]) => feedbacks[0]));

  /** Observable who get the feedack's alert after his creation */
  feedbackCreated$ = this.feedbackCreationNotification$.pipe(
    switchMap((feedback) =>
      this.alertFeedbackService.create$({
        type: feedback.type || undefined,
        qualification: feedback.qualification || undefined,
        isArchived: feedback.isArchived || false,
        isPertinent: feedback.isPertinent == null ? true : feedback.isPertinent,
        alert: feedback.alertId,
      }),
    ),
  );

  /** Observable who get the last feedback from feedbackInitialization$ and feedbackCreated$ */
  lastFeedback$: Observable<AlertFeedback> = merge(
    this.feedbackInitialization$,
    this.feedbackCreated$,
  );
}
