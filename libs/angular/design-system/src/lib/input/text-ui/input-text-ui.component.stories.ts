import { Meta, Story } from '@storybook/angular';
import { userEvent, within } from '@storybook/testing-library';

import { InputTextUiComponent } from './input-text-ui.component';

export default {
  title: 'Design System/Input/Text',
  component: InputTextUiComponent,
} as Meta<InputTextUiComponent>;

/**
 * Filling input with the given string
 * @param string
 * @param delay
 * @returns
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

const Template: Story<InputTextUiComponent> = (args: InputTextUiComponent) => ({
  props: args,
});

// Default Component
export const TextDefault = Template.bind({});
TextDefault.args = {};

// Component with label
export const TextWithLabel = Template.bind({});
TextWithLabel.args = {
  label: 'Input Label',
};

// Component with an empty placeholder
export const TextEmptyPlaceholder = Template.bind({});
TextEmptyPlaceholder.args = {
  placeholder: '',
};

// Component with a custom placeholder
export const TextWithPlaceholder = Template.bind({});
TextWithPlaceholder.args = {
  placeholder: 'custom placeholder',
};

// Component disabled state
export const TextDisabled = Template.bind({});
TextDisabled.args = {
  disabled: true,
};

// Component with filling animation
export const TextFilling = Template.bind({});
TextFilling.play = fillingPlay('Text Filling');
TextFilling.args = {};
