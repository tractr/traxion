import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
} from '@angular/core';

import {
  AlertFeedback,
  AlertFeedbackQualification,
  AlertFeedbackType,
} from '@cali/common-models';

@Component({
  selector: 'cali-feedback-status-ui',
  templateUrl: './feedback-status-ui.component.html',
  styleUrls: ['./feedback-status-ui.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackStatusUiComponent implements OnChanges {
  @Input() alertFeedback!: AlertFeedback;

  statusFeedback: {
    state: 'new' | 'type' | 'qualification' | 'archived';
    label:
      | 'newAlert'
      | AlertFeedbackType
      | AlertFeedbackQualification
      | 'archived';
  } = { state: 'new', label: 'newAlert' };

  ngOnChanges() {
    if (this.alertFeedback.type === null) {
      this.statusFeedback = { state: 'new', label: 'newAlert' };
    } else if (this.alertFeedback.qualification === null) {
      this.statusFeedback = { state: 'type', label: this.alertFeedback.type };
    } else if (!this.alertFeedback.isArchived) {
      this.statusFeedback = {
        state: 'qualification',
        label: this.alertFeedback.qualification,
      };
    } else {
      this.statusFeedback = { state: 'archived', label: 'archived' };
    }
  }
}
