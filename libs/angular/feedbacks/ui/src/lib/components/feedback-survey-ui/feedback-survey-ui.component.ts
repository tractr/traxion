import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import {
  AlertFeedback,
  AlertFeedbackQualification,
  AlertFeedbackType,
  ItemCategory,
} from '@cali/common-models';

@Component({
  selector: 'cali-feedback-survey-ui',
  templateUrl: './feedback-survey-ui.component.html',
  styleUrls: ['./feedback-survey-ui.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackSurveyUiComponent {
  @Output() alertFeedbackChange = new EventEmitter();

  @Input() alertFeedback!: AlertFeedback;

  @Input() itemsCategory: Pick<ItemCategory, 'id' | 'name'>[] = [];

  alertFeedbackTypeChange(feedbackType: AlertFeedbackType) {
    this.alertFeedback = {
      ...this.alertFeedback,
      type: feedbackType,
      qualification: null,
      isPertinent: null,
    };
    this.alertFeedbackChange.emit(this.alertFeedback);
  }

  alertFeedbackQualificationChange(
    feedbackQualification: AlertFeedbackQualification,
  ) {
    this.alertFeedback = {
      ...this.alertFeedback,
      qualification: feedbackQualification,
      isPertinent: null,
    };
    this.alertFeedbackChange.emit(this.alertFeedback);
  }

  alertFeedbackPertinentChange(isPertinent: boolean) {
    this.alertFeedback = {
      ...this.alertFeedback,
      isPertinent,
    };
    this.alertFeedbackChange.emit(this.alertFeedback);
  }
}
