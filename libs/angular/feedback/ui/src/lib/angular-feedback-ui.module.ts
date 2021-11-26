import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  FeedbackEstimationsUiComponent,
  FeedbackPertinentUiComponent,
  FeedbackQualificationsSelectorUiComponent,
  FeedbackSurveyUiComponent,
  FeedbackTypesSelectorUiComponent,
} from './components';

import { AngularCommonUiModule } from '@cali/angular-common-ui';

@NgModule({
  imports: [CommonModule, AngularCommonUiModule, FormsModule],
  declarations: [
    FeedbackTypesSelectorUiComponent,
    FeedbackQualificationsSelectorUiComponent,
    FeedbackPertinentUiComponent,
    FeedbackEstimationsUiComponent,
    FeedbackSurveyUiComponent,
  ],
  exports: [],
})
export class AngularFeedbackUiModule {}
