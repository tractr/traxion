import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FeedbackDetailsComponent } from './components';

import { AngularFeedbacksUiModule } from '@cali/angular-feedbacks-ui';

@NgModule({
  imports: [CommonModule, AngularFeedbacksUiModule],
  declarations: [FeedbackDetailsComponent],
  exports: [FeedbackDetailsComponent],
})
export class AngularFeedbacksFeaturesModule {}
