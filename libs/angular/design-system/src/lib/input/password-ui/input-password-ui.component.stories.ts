import { Meta, Story } from '@storybook/angular';

import { InputPasswordUiComponent } from './input-password-ui.component';

export default {
  title: 'Design System/Input/Password',
  component: InputPasswordUiComponent,
} as Meta<InputPasswordUiComponent>;

const Template: Story<InputPasswordUiComponent> = (
  args: InputPasswordUiComponent,
) => ({
  props: args,
});

export const PasswordDefault = Template.bind({});
PasswordDefault.args = {};

export const PasswordWithLabel = Template.bind({});
PasswordWithLabel.args = {
  label: 'Input Label',
};

export const PasswordWithoutPlaceholder = Template.bind({});
PasswordWithoutPlaceholder.args = {
  placeholder: '',
};

export const PasswordWithPlaceholder = Template.bind({});
PasswordWithPlaceholder.args = {
  placeholder: 'custom placeholder',
};
