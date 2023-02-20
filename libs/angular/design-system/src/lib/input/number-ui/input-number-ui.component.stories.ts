import { Meta, Story } from '@storybook/angular';

import { InputNumberUiComponent } from './input-number-ui.component';

export default {
  title: 'Design System/Input/Number',
  component: InputNumberUiComponent,
} as Meta<InputNumberUiComponent>;

const Template: Story<InputNumberUiComponent> = (
  args: InputNumberUiComponent,
) => ({
  props: args,
});

export const NumberDefault = Template.bind({});
NumberDefault.args = {};

export const NumberWithLabel = Template.bind({});
NumberWithLabel.args = {
  label: 'Input Label',
};

export const NumberWithoutPlaceholder = Template.bind({});
NumberWithoutPlaceholder.args = {
  placeholder: '',
};

export const NumberWithPlaceholder = Template.bind({});
NumberWithPlaceholder.args = {
  placeholder: 'custom placeholder',
};
