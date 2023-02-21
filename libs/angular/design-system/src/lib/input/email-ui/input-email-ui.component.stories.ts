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

export const EmailEmptyPlaceholder = Template.bind({});
EmailEmptyPlaceholder.args = {
  placeholder: '',
};

export const EmailWithPlaceholder = Template.bind({});
EmailWithPlaceholder.args = {
  placeholder: 'admin@trxn-angular.com',
};

export const EmailDisabled = Template.bind({});
EmailDisabled.args = {
  disabled: true,
};
