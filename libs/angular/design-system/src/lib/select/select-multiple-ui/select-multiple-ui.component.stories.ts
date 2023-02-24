import { Meta, Story } from '@storybook/angular';
import { userEvent, within } from '@storybook/testing-library';

import { SelectMultipleUiComponent } from './select-multiple-ui.component';

export default {
  title: 'Design System/Select/SelectMultiple',
  component: SelectMultipleUiComponent,
} as Meta<SelectMultipleUiComponent>;

/**
 * Selecting options
 * @param string
 * @param delay
 */
function selectPlay(stringList: string[]) {
  return async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const select = canvas.getByRole('listbox');

    userEvent.selectOptions(select, stringList);
  };
}

const options = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
];

const Template: Story<SelectMultipleUiComponent> = (
  args: SelectMultipleUiComponent,
) => ({
  props: {
    ...args,
    options,
  },
});

// Default Component
export const SelectMultipleDefault = Template.bind({});
SelectMultipleDefault.args = {};

// Component with label
export const SelectMultipleWithLabel = Template.bind({});
SelectMultipleWithLabel.args = {
  label: 'Select Label',
};

// Component disabled state
export const SelectMultipleDisabled = Template.bind({});
SelectMultipleDisabled.args = {
  disabled: true,
};

// Component with select animation
export const SelectMultipleSelected = Template.bind({});
SelectMultipleSelected.play = selectPlay(['2', '3']);
SelectMultipleSelected.args = {};
