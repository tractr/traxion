import { TranslateModule } from '@ngx-translate/core';
import { Meta, moduleMetadata, Story } from '@storybook/angular';

import { FeedbackPertinentUiComponent } from './feedback-pertinent-ui.component';

import { AngularCommonUiModule } from '@cali/angular-common-ui';

interface PertinentFeedbackIO {
  alertFeedbackPertinent: boolean;
}

const baseProps = (
  override: Partial<PertinentFeedbackIO> = {},
): PertinentFeedbackIO => ({
  alertFeedbackPertinent: false,
  ...override,
});

export default {
  title: 'Feedback/Pertinent',
  component: FeedbackPertinentUiComponent,
  decorators: [
    moduleMetadata({
      imports: [AngularCommonUiModule, TranslateModule],
    }),
  ],
} as Meta<FeedbackPertinentUiComponent>;

const Template: Story<FeedbackPertinentUiComponent> = (
  args: FeedbackPertinentUiComponent,
) => ({
  component: FeedbackPertinentUiComponent,
  props: args,
});

/** Storie alertFeedback pertinent */
export const PertinentFeedback = Template.bind({});
PertinentFeedback.args = baseProps();
