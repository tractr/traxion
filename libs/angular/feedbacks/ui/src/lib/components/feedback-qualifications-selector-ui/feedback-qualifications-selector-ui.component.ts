import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import {
  AlertFeedbackQualification,
  AlertFeedbackType,
} from '@cali/common-models';

@Component({
  selector: 'cali-feedback-qualifications-selector-ui',
  templateUrl: './feedback-qualifications-selector-ui.component.html',
  styleUrls: ['./feedback-qualifications-selector-ui.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackQualificationsSelectorUiComponent {
  /** Getter and setter to alertFeedbackType variable */
  @Input()
  set alertFeedbackType(type: AlertFeedbackType) {
    this.feedbackQualifications = this.getQualifications(type);
  }
  /** Getter and setter to alertFeedbackType variable */

  feedbackQualifications: AlertFeedbackQualification[] = [];

  @Output() alertFeedbackQualificationChange = new EventEmitter();

  @Input() alertFeedbackQualification: AlertFeedbackQualification | null = null;

  alertFeedbackQualificationOnChange() {
    this.alertFeedbackQualificationChange.emit(this.alertFeedbackQualification);
  }

  getQualifications(
    feedbackType: AlertFeedbackType,
  ): AlertFeedbackQualification[] {
    if (feedbackType === AlertFeedbackType.falseAlert)
      return [
        AlertFeedbackQualification.nothingSuspect,
        AlertFeedbackQualification.suspectBehaviour,
      ];

    return [
      AlertFeedbackQualification.stopped,
      AlertFeedbackQualification.unstopped,
      AlertFeedbackQualification.dissuasion,
    ];
  }
}
