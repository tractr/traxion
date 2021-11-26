import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { AlertFeedbackType } from '@cali/common-models';

@Component({
  selector: 'cali-feedback-types-selector-ui',
  templateUrl: './feedback-types-selector-ui.component.html',
  styleUrls: ['./feedback-types-selector-ui.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackTypesSelectorUiComponent {
  private alertFeedbackTypeValue: AlertFeedbackType | null = null;

  @Output() alertFeedbackTypeChange = new EventEmitter();

  @Input()
  get alertFeedbackType() {
    return this.alertFeedbackTypeValue;
  }

  set alertFeedbackType(type) {
    this.alertFeedbackTypeValue = type;
    this.alertFeedbackTypeChange.emit(this.alertFeedbackTypeValue);
  }
}
