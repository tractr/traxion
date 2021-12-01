import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subject, switchMap, takeUntil } from 'rxjs';

import { AlertFeedbackService } from '@cali/angular-rext-client';
import { AlertFeedback } from '@cali/common-models';

@Component({
  selector: 'cali-feedback-details',
  templateUrl: './feedback-details.component.html',
  styleUrls: ['./feedback-details.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackDetailsComponent implements OnInit, OnDestroy {
  constructor(private alertFeedbackService: AlertFeedbackService) {}

  @Input() feedback!: AlertFeedback;

  /** Subject use to know when a new feedback alert is created */
  feedbackCreationNotification$: Subject<AlertFeedback> =
    new Subject<AlertFeedback>();

  unsubscribe$ = new Subject<void>();

  ngOnInit() {
    this.feedbackCreationNotification$
      .pipe(
        takeUntil(this.unsubscribe$),
        switchMap((feedback) =>
          this.alertFeedbackService.create$({
            type: feedback.type || undefined,
            qualification: feedback.qualification || undefined,
            isArchived: feedback.isArchived || false,
            isPertinent:
              feedback.isPertinent == null ? true : feedback.isPertinent,
            alert: feedback.alertId,
          }),
        ),
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
  }
}
