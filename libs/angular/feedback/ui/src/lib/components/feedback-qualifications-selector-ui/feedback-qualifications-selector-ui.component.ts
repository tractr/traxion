import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { AlertFeedbackQualification } from '@cali/common-models';

@Component({
  selector: 'cali-feedback-qualifications-selector-ui',
  templateUrl: './feedback-qualifications-selector-ui.component.html',
  styleUrls: ['./feedback-qualifications-selector-ui.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackQualificationsSelectorUiComponent {
  @Input() alertFeedbackQualification: AlertFeedbackQualification | null = null;

  @Output() alertFeedbackQualificationChange =
    new EventEmitter<AlertFeedbackQualification>();
}
