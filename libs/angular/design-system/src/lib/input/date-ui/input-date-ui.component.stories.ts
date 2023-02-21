import { Meta, Story } from '@storybook/angular';
import { userEvent, within } from '@storybook/testing-library';

import { InputDateUiComponent } from './input-date-ui.component';

export default {
  title: 'Design System/Input/Date',
  component: InputDateUiComponent,
} as Meta<InputDateUiComponent>;

/**
 * Filling input with the given string
 * @param string
 * @param delay
 * @returns
 */
function fillingPlay(string: string, delay = 50) {
  return async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getAllByDisplayValue('')[0];
    await userEvent.type(input, string, {
      delay,
    });
  };
}

const Template: Story<InputDateUiComponent> = (args: InputDateUiComponent) => ({
  props: args,
});

// Default component
export const DateDefault = Template.bind({});
DateDefault.args = {};

// Component with label
export const DateWithLabel = Template.bind({});
DateWithLabel.args = {
  label: 'Input Label',
};

// Component disabled state
export const DateDisabled = Template.bind({});
DateDisabled.args = {
  disabled: true,
};

// Component with filling animation
export const DateFilling = Template.bind({});
DateFilling.play = fillingPlay('2023-02-21');
DateFilling.args = {};
