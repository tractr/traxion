import { Meta, Story } from '@storybook/angular';
import { within } from '@storybook/testing-library';

import { InputDatetimeUiComponent } from './input-datetime-ui.component';

export default {
  title: 'Design System/Input/Datetime',
  component: InputDatetimeUiComponent,
} as Meta<InputDatetimeUiComponent>;

/**
 * Filling input with the given string
 * @param string
 * @param delay
 */
function fillingPlay(string: string) {
  return async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getAllByDisplayValue('')[0];
    input.setAttribute('value', string);
  };
}

const Template: Story<InputDatetimeUiComponent> = (
  args: InputDatetimeUiComponent,
) => ({
  props: args,
});

// Default component
export const DatetimeDefault = Template.bind({});
DatetimeDefault.args = {};

// Component with label
export const DatetimeWithLabel = Template.bind({});
DatetimeWithLabel.args = {
  label: 'Input Label',
};

// Component disabled state
export const DatetimeDisabled = Template.bind({});
DatetimeDisabled.args = {
  disabled: true,
};

// Component with filling animation
export const DatetimeFilling = Template.bind({});
DatetimeFilling.play = fillingPlay('2023-02-21T01:23:00');
DatetimeFilling.args = {};
