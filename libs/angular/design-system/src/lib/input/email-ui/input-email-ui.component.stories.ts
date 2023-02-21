import { Meta, Story } from '@storybook/angular';
import { userEvent, within } from '@storybook/testing-library';

import { InputEmailUiComponent } from './input-email-ui.component';

export default {
  title: 'Design System/Input/Email',
  component: InputEmailUiComponent,
} as Meta<InputEmailUiComponent>;

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

const Template: Story<InputEmailUiComponent> = (
  args: InputEmailUiComponent,
) => ({
  props: args,
});

// Default Component
export const EmailDefault = Template.bind({});
EmailDefault.args = {};

// Component with label
export const EmailWithLabel = Template.bind({});
EmailWithLabel.args = {
  label: 'Input Label',
};

// Component with an empty placeholder
export const EmailEmptyPlaceholder = Template.bind({});
EmailEmptyPlaceholder.args = {
  placeholder: '',
};

// Component with a custom placeholder
export const EmailWithPlaceholder = Template.bind({});
EmailWithPlaceholder.args = {
  placeholder: 'admin@trxn-angular.com',
};

// Component disabled state
export const EmailDisabled = Template.bind({});
EmailDisabled.args = {
  disabled: true,
};

// Component with filling animation
export const EmailFilling = Template.bind({});
EmailFilling.play = fillingPlay('admin@trxn-angular.com');
EmailFilling.args = {};
