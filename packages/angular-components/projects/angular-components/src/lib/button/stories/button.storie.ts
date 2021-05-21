import { CommonModule } from '@angular/common';
import { moduleMetadata } from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';

import { DefaultStorybookModules } from '../../storybook.module';
import { ButtonComponent } from '../button.component';

interface ButtonIO {
  type: 'primary' | 'dashed' | 'link' | 'text' | 'default';
}

const baseProps = (override: Partial<ButtonIO> = {}): ButtonIO => ({
  type: 'default',
  ...override,
});

export default {
  title: 'Tractr/Button',
  component: ButtonComponent,
  decorators: [
    moduleMetadata({
      declarations: [ButtonComponent],
      imports: [CommonModule, ...DefaultStorybookModules],
    }),
  ],
};

const Template: Story<ButtonComponent> = (props) => ({
  component: ButtonComponent,
  template: `<lib-button [type]="type"></lib-button>`,
  props,
});

// Default
export const Default = Template.bind({});
Default.args = baseProps();

// Primary
export const Primary = Template.bind({});
Primary.args = baseProps({ type: 'primary' });

// Dashed
export const Secondary = Template.bind({});
Secondary.args = baseProps({ type: 'dashed' });
