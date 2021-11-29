import { TranslateModule } from '@ngx-translate/core';
import { Meta, moduleMetadata, Story } from '@storybook/angular';

import { FeedbackStatusUiComponent } from './feedback-status-ui.component';

import { AngularCommonUiModule } from '@cali/angular-common-ui';
import { mockAlertFeedbackFactory } from '@cali/common-models';

export default {
  title: 'Feedback/Status',
  component: FeedbackStatusUiComponent,
  decorators: [
    moduleMetadata({
      imports: [AngularCommonUiModule, TranslateModule],
    }),
  ],
} as Meta<FeedbackStatusUiComponent>;

const Template: Story<FeedbackStatusUiComponent> = (
  args: FeedbackStatusUiComponent,
) => ({
  component: FeedbackStatusUiComponent,
  props: args,
});

/** Mock  AlertFeedBack Empty */
const alertFeedbackEmpty = mockAlertFeedbackFactory({
  type: null,
  qualification: null,
  isPertinent: null,
});
export const StatusNewAlert = Template.bind({});
StatusNewAlert.args = { alertFeedback: alertFeedbackEmpty };
