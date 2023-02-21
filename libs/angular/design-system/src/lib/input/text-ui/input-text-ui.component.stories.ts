import { Meta, Story } from '@storybook/angular';

import { InputTextUiComponent } from './input-text-ui.component';

export default {
  title: 'Design System/Input/Text',
  component: InputTextUiComponent,
} as Meta<InputTextUiComponent>;

const Template: Story<InputTextUiComponent> = (args: InputTextUiComponent) => ({
  props: args,
});

export const TextDefault = Template.bind({});
TextDefault.args = {};

export const TextWithLabel = Template.bind({});
TextWithLabel.args = {
  label: 'Input Label',
};

export const TextEmptyPlaceholder = Template.bind({});
TextEmptyPlaceholder.args = {
  placeholder: '',
};

export const TextWithPlaceholder = Template.bind({});
TextWithPlaceholder.args = {
  placeholder: 'custom placeholder',
};

export const TextDisabled = Template.bind({});
TextDisabled.args = {
  disabled: true,
};
