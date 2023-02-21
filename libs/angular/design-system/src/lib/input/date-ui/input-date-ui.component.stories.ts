import { Meta, Story } from '@storybook/angular';

import { InputDateUiComponent } from './input-date-ui.component';

export default {
  title: 'Design System/Input/Date',
  component: InputDateUiComponent,
} as Meta<InputDateUiComponent>;

const Template: Story<InputDateUiComponent> = (args: InputDateUiComponent) => ({
  props: args,
});

export const DateDefault = Template.bind({});
DateDefault.args = {};

export const DateWithLabel = Template.bind({});
DateWithLabel.args = {
  label: 'Input Label',
};

export const DateDisabled = Template.bind({});
DateDisabled.args = {
  disabled: true,
};
