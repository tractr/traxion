import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { Meta, moduleMetadata, Story } from '@storybook/angular';

import { FeedbackTypesSelectorUiComponent } from './feedback-types-selector-ui.component';

import { AngularCommonUiModule } from '@cali/angular-common-ui';
import { AlertFeedbackType } from '@cali/common-models';

interface TypesSelectorFeedbackIO {
  alertFeedbackType: AlertFeedbackType | null;
}

const baseProps = (
  override: Partial<TypesSelectorFeedbackIO> = {},
): TypesSelectorFeedbackIO => ({ alertFeedbackType: null, ...override });

export default {
  title: 'Feedback/Types Selector',
  component: FeedbackTypesSelectorUiComponent,
  decorators: [
    moduleMetadata({
      imports: [AngularCommonUiModule, TranslateModule, FormsModule],
    }),
  ],
} as Meta<FeedbackTypesSelectorUiComponent>;

const Template: Story<FeedbackTypesSelectorUiComponent> = (
  args: FeedbackTypesSelectorUiComponent,
) => ({
  component: FeedbackTypesSelectorUiComponent,
  props: args,
});

/** Storie alertFeedback without type */
export const TypeFeedbackNull = Template.bind({});
TypeFeedbackNull.args = baseProps();

/** Storie alertFeedback with type thief */
export const TypeFeedbackThief = Template.bind({});
TypeFeedbackThief.args = baseProps({ alertFeedbackType: 'thief' });

/** Storie alertFeedback with type suspectBehavior */
export const TypeFeedbackBehaviorSuspect = Template.bind({});
TypeFeedbackBehaviorSuspect.args = baseProps({
  alertFeedbackType: 'suspectBehavior',
});

/** Storie alertFeedback with type falseAlert */
export const TypeFeedbackFalseAlert = Template.bind({});
TypeFeedbackFalseAlert.args = baseProps({ alertFeedbackType: 'falseAlert' });
