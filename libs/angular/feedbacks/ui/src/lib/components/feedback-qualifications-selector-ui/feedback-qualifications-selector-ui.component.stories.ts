import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { Meta, moduleMetadata, Story } from '@storybook/angular';

import { FeedbackQualificationsSelectorUiComponent } from './feedback-qualifications-selector-ui.component';

import { AngularCommonUiModule } from '@cali/angular-common-ui';
import { AlertFeedbackQualification } from '@cali/common-models';

interface QualificationsSelectorFeedbackIO {
  alertFeedbackQualification: AlertFeedbackQualification | null;
}

const baseProps = (
  override: Partial<QualificationsSelectorFeedbackIO> = {},
): QualificationsSelectorFeedbackIO => ({
  alertFeedbackQualification: null,
  ...override,
});

export default {
  title: 'Feedback/Qualifications Selector',
  component: FeedbackQualificationsSelectorUiComponent,
  decorators: [
    moduleMetadata({
      imports: [AngularCommonUiModule, TranslateModule, FormsModule],
    }),
  ],
} as Meta<FeedbackQualificationsSelectorUiComponent>;

const Template: Story<FeedbackQualificationsSelectorUiComponent> = (
  args: FeedbackQualificationsSelectorUiComponent,
) => ({
  component: FeedbackQualificationsSelectorUiComponent,
  props: args,
});

/** Storie alertFeedback without qualification */
export const QualificationFeedbackNull = Template.bind({});
QualificationFeedbackNull.args = baseProps();

/** Storie alertFeedback with qualification stopped */
export const QualificationFeedbackStopped = Template.bind({});
QualificationFeedbackStopped.args = {
  alertFeedbackQualification: 'stopped',
};

/** Storie alertFeedback with qualification unstopped */
export const QualificationFeedbackUnstopped = Template.bind({});
QualificationFeedbackUnstopped.args = {
  alertFeedbackQualification: 'unstopped',
};

/** Storie alertFeedback with qualification dissuasion */
export const QualificationFeedbackDissuasion = Template.bind({});
QualificationFeedbackDissuasion.args = {
  alertFeedbackQualification: 'dissuasion',
};

/** Storie alertFeedback with qualification nothingSuspect */
export const QualificationFeedbackNothingSuspect = Template.bind({});
QualificationFeedbackNothingSuspect.args = {
  alertFeedbackQualification: 'nothingSuspect',
};

/** Storie alertFeedback with qualification suspectBehavior */
export const QualificationFeedbackSuspectBehaviour = Template.bind({});
QualificationFeedbackSuspectBehaviour.args = {
  alertFeedbackQualification: 'suspectBehaviour',
};
