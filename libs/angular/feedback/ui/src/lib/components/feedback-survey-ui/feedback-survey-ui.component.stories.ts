import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { Meta, moduleMetadata, Story } from '@storybook/angular';

import { FeedbackEstimationsUiComponent } from '../feedback-estimations-ui/feedback-estimations-ui.component';
import { FeedbackPertinentUiComponent } from '../feedback-pertinent-ui/feedback-pertinent-ui.component';
import { FeedbackQualificationsSelectorUiComponent } from '../feedback-qualifications-selector-ui/feedback-qualifications-selector-ui.component';
import { FeedbackTypesSelectorUiComponent } from '../feedback-types-selector-ui/feedback-types-selector-ui.component';
import { FeedbackSurveyUiComponent } from './feedback-survey-ui.component';

import { AngularCommonUiModule } from '@cali/angular-common-ui';
import { mockAlertFeedbackFactory } from '@cali/common-models';

export default {
  title: 'Feedback/Survey',
  component: FeedbackSurveyUiComponent,
  decorators: [
    moduleMetadata({
      declarations: [
        FeedbackTypesSelectorUiComponent,
        FeedbackQualificationsSelectorUiComponent,
        FeedbackEstimationsUiComponent,
        FeedbackPertinentUiComponent,
      ],
      imports: [
        AngularCommonUiModule,
        TranslateModule,
        FormsModule,
        BrowserModule,
        BrowserAnimationsModule,
      ],
    }),
  ],
} as Meta<FeedbackSurveyUiComponent>;

const Template: Story<FeedbackSurveyUiComponent> = (
  args: FeedbackSurveyUiComponent,
) => ({
  component: FeedbackSurveyUiComponent,
  props: args,
});

/** Mock  AlertFeedBack Empty */
const itemsCategory = [
  {
    id: '1',
    name: 'Maquillage',
  },
  {
    id: '2',
    name: 'Vins',
  },
  {
    id: '3',
    name: 'Bière',
  },
  {
    id: '4',
    name: 'Fruit',
  },
  {
    id: '5',
    name: 'Légume',
  },
];
const alertFeedbackEmpty = mockAlertFeedbackFactory({
  type: null,
  qualification: null,
  isPertinent: null,
});

export const SurveyEmpty = Template.bind({});
SurveyEmpty.args = { alertFeedback: alertFeedbackEmpty, itemsCategory };
