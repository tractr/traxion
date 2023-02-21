import { Meta, Story } from '@storybook/angular';
import { userEvent, within } from '@storybook/testing-library';

import { InputTimeUiComponent } from './input-time-ui.component';

export default {
  title: 'Design System/Input/Time',
  component: InputTimeUiComponent,
} as Meta<InputTimeUiComponent>;

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

const Template: Story<InputTimeUiComponent> = (args: InputTimeUiComponent) => ({
  props: args,
});

// Default component
export const TimeDefault = Template.bind({});
TimeDefault.args = {};

// Component with label
export const TimeWithLabel = Template.bind({});
TimeWithLabel.args = {
  label: 'Input Label',
};

// Component disabled state
export const TimeDisabled = Template.bind({});
TimeDisabled.args = {
  disabled: true,
};

// Component with filling animation
export const TimeFilling = Template.bind({});
TimeFilling.play = fillingPlay('01:23');
TimeFilling.args = {};
