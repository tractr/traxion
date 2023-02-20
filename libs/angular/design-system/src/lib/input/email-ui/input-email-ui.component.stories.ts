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

export const EmailDefault = Template.bind({});
EmailDefault.args = {};

export const EmailWithLabel = Template.bind({});
EmailWithLabel.args = {
  label: 'Input Label',
};

export const EmailWithoutPlaceholder = Template.bind({});
EmailWithoutPlaceholder.args = {
  placeholder: '',
};

export const EmailWithPlaceholder = Template.bind({});
EmailWithPlaceholder.args = {
  placeholder: 'admin@trxn-angular.com',
};
