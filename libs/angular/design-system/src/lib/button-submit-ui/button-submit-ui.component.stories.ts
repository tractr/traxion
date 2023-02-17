import { Meta, Story } from '@storybook/angular';

import { ButtonSubmitUiComponent } from './button-submit-ui.component';

export default {
  title: 'Design System/Submit Button',
  component: ButtonSubmitUiComponent,
} as Meta<ButtonSubmitUiComponent>;

const Template: Story<ButtonSubmitUiComponent> = (
  args: ButtonSubmitUiComponent,
) => ({
  props: args,
  template: `<trxn-button-submit-ui [disabled]="disabled">Submit Button</trxn-button-submit-ui>`,
});

export const ButtonEnabled = Template.bind({});
ButtonEnabled.args = {
  label: 'Button',
  disabled: false,
};

export const ButtonDisabled = Template.bind({});
ButtonDisabled.args = {
  label: 'Button',
  disabled: true,
};
