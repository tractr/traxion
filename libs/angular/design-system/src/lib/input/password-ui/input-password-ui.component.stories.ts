import { Meta, Story } from '@storybook/angular';
import { userEvent, within } from '@storybook/testing-library';

import { InputPasswordUiComponent } from './input-password-ui.component';

export default {
  title: 'Design System/Input/Password',
  component: InputPasswordUiComponent,
} as Meta<InputPasswordUiComponent>;

/**
 * Filling input with the given string
 * @param string
 * @param delay
 */
function fillingPlay(string: string, delay = 100) {
  return async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getAllByDisplayValue('')[0];
    await userEvent.type(input, string, {
      delay,
    });
  };
}

const Template: Story<InputPasswordUiComponent> = (
  args: InputPasswordUiComponent,
) => ({
  props: args,
});

// Default component
export const PasswordDefault = Template.bind({});
PasswordDefault.args = {};

// Component with label
export const PasswordWithLabel = Template.bind({});
PasswordWithLabel.args = {
  label: 'Input Label',
};

// Component with an empty placeholder
export const PasswordEmptyPlaceholder = Template.bind({});
PasswordEmptyPlaceholder.args = {
  placeholder: '',
};

// Component with a custom placeholder
export const PasswordWithPlaceholder = Template.bind({});
PasswordWithPlaceholder.args = {
  placeholder: 'custom placeholder',
};

// Component disabled state
export const PasswordDisabled = Template.bind({});
PasswordDisabled.args = {
  disabled: true,
};

// Component with filling animation
export const PasswordFilling = Template.bind({});
PasswordFilling.play = fillingPlay('Password Filling');
PasswordFilling.args = {};

// Component with password shown state
export const PasswordShow = Template.bind({});
PasswordShow.play = fillingPlay('Password Visible');
PasswordShow.args = {
  showPassword: true,
};
