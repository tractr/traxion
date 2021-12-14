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
  @Output() alertFeedbackChange = new EventEmitter<AlertFeedback>();

  @Input() alertFeedback!: AlertFeedback;

  @Input() itemsCategory: Pick<ItemCategory, 'id' | 'name'>[] | null = null;

  alertFeedbackTypeChange(feedbackType: AlertFeedbackType) {
    this.alertFeedback = {
      ...this.alertFeedback,
      type: feedbackType,
      qualification: null,
      isPertinent: true,
      itemCategoryId: null,
      thiefValue: null,
    };
    this.alertFeedbackChange.emit(this.alertFeedback);
  }

  alertFeedbackQualificationChange(
    feedbackQualification: AlertFeedbackQualification,
  ) {
    this.alertFeedback = {
      ...this.alertFeedback,
      qualification: feedbackQualification,
      isPertinent: true,
      itemCategoryId: null,
      thiefValue: null,
    };
    this.alertFeedbackChange.emit(this.alertFeedback);
  }

  alertFeedbackPertinentChange(isPertinent: boolean) {
    this.alertFeedback = {
      ...this.alertFeedback,
      isPertinent: isPertinent === null ? true : isPertinent,
      itemCategoryId: null,
      thiefValue: null,
    };
    this.alertFeedbackChange.emit(this.alertFeedback);
  }

  alertFeedbackItemCategoryChange(itemCategory: string) {
    this.alertFeedback = {
      ...this.alertFeedback,
      itemCategoryId: itemCategory,
    };
    this.alertFeedbackChange.emit(this.alertFeedback);
  }

  alertFeedbackTheftValueChange(theftValue: number) {
    this.alertFeedback = {
      ...this.alertFeedback,
      thiefValue: theftValue,
    };
    this.alertFeedbackChange.emit(this.alertFeedback);
  }
}
