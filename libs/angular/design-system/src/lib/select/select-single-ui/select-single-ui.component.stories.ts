import { Meta, Story } from '@storybook/angular';
import { userEvent, within } from '@storybook/testing-library';

import { SelectSingleUiComponent } from './select-single-ui.component';

export default {
  title: 'Design System/Select/SelectSingle',
  component: SelectSingleUiComponent,
} as Meta<SelectSingleUiComponent>;

/**
 * Selecting an option
 * @param string
 * @param delay
 */
function selectPlay(string: string) {
  return async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const select = canvas.getAllByDisplayValue('')[0];
    userEvent.selectOptions(select, string);
  };
}

const options = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
];

const Template: Story<SelectSingleUiComponent> = (
  args: SelectSingleUiComponent,
) => ({
  props: {
    ...args,
    options,
  },
});

// Default Component
export const SelectSingleDefault = Template.bind({});
SelectSingleDefault.args = {};

// Component with label
export const SelectSingleWithLabel = Template.bind({});
SelectSingleWithLabel.args = {
  label: 'Select Label',
};

// Component disabled state
export const SelectSingleDisabled = Template.bind({});
SelectSingleDisabled.args = {
  disabled: true,
};

// Component with select animation
export const SelectSingleSelected = Template.bind({});
SelectSingleSelected.play = selectPlay('2');
SelectSingleSelected.args = {};
