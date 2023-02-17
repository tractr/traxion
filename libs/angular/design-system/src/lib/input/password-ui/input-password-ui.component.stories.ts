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

export const PasswordFilled = Template.bind({});
PasswordFilled.args = {};
