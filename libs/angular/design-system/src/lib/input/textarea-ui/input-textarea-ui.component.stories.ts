import { Meta, Story } from '@storybook/angular';
import { userEvent, within } from '@storybook/testing-library';

import { InputTextareaUiComponent } from './input-textarea-ui.component';

export default {
  title: 'Design System/Input/Textarea',
  component: InputTextareaUiComponent,
} as Meta<InputTextareaUiComponent>;

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

const Template: Story<InputTextareaUiComponent> = (
  args: InputTextareaUiComponent,
) => ({
  props: args,
});

// Default Component
export const TextareaDefault = Template.bind({});
TextareaDefault.args = {};

// Component with label
export const TextareaWithLabel = Template.bind({});
TextareaWithLabel.args = {
  label: 'Input Label',
};

// Component with an empty placeholder
export const TextareaEmptyPlaceholder = Template.bind({});
TextareaEmptyPlaceholder.args = {
  placeholder: '',
};

// Component with a custom placeholder
export const TextareaWithPlaceholder = Template.bind({});
TextareaWithPlaceholder.args = {
  placeholder: 'custom placeholder',
};

// Component disabled state
export const TextareaDisabled = Template.bind({});
TextareaDisabled.args = {
  disabled: true,
};

// Component with filling animation
export const TextareaFilling = Template.bind({});
TextareaFilling.play = fillingPlay(' Textarea Filling');
TextareaFilling.args = {};
