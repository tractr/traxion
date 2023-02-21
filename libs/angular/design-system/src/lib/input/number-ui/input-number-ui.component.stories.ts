import { Meta, Story } from '@storybook/angular';
import { userEvent, within } from '@storybook/testing-library';

import { InputNumberUiComponent } from './input-number-ui.component';

export default {
  title: 'Design System/Input/Number',
  component: InputNumberUiComponent,
} as Meta<InputNumberUiComponent>;

/**
 * Filling input with the given string
 * @param string
 * @param delay
 * @returns
 */
function fillingPlay(number: number, delay = 100) {
  return async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getAllByDisplayValue('')[0];
    await userEvent.type(input, `${number}`, {
      delay,
    });
  };
}

const Template: Story<InputNumberUiComponent> = (
  args: InputNumberUiComponent,
) => ({
  props: args,
});

// Default Component
export const NumberDefault = Template.bind({});
NumberDefault.args = {};

// Component with label
export const NumberWithLabel = Template.bind({});
NumberWithLabel.args = {
  label: 'Input Label',
};

// Component with an empty placeholder
export const NumberEmptyPlaceholder = Template.bind({});
NumberEmptyPlaceholder.args = {
  placeholder: '',
};

// Component with a custom placeholder
export const NumberWithPlaceholder = Template.bind({});
NumberWithPlaceholder.args = {
  placeholder: 'custom placeholder',
};

// Component disabled state
export const NumberDisabled = Template.bind({});
NumberDisabled.args = {
  disabled: true,
};

// Component with filling animation
export const NumberFilling = Template.bind({});
NumberFilling.play = fillingPlay(123456789);
NumberFilling.args = {};
