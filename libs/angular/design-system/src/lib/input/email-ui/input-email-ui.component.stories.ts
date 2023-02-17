import { Meta, Story } from '@storybook/angular';

import { InputEmailUiComponent } from './input-email-ui.component';

export default {
  title: 'Design System/Input/Email',
  component: InputEmailUiComponent,
} as Meta<InputEmailUiComponent>;

const Template: Story<InputEmailUiComponent> = (
  args: InputEmailUiComponent,
) => ({
  props: args,
});

export const EmailEmptyPlaceholder = Template.bind({});
EmailEmptyPlaceholder.args = {
  placeholder: '',
};

export const EmailWithPlaceholder = Template.bind({});
EmailWithPlaceholder.args = {
  placeholder: 'admin@trxn-angular.com',
};

export const EmailWithLabel = Template.bind({});
EmailWithPlaceholder.args = {
  label: 'Input Label',
};
