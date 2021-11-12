import { TranslateModule } from '@ngx-translate/core';
import { Meta, moduleMetadata, Story } from '@storybook/angular';

import { AlertFilterArchivedUiComponent } from './alert-filter-archived-ui.component';

import { AngularCommonUiModule } from '@cali/angular-common-ui';

export default {
  title: 'Alert/Alert Filter Archived',
  component: AlertFilterArchivedUiComponent,
  decorators: [
    moduleMetadata({
      imports: [AngularCommonUiModule, TranslateModule.forRoot()],
    }),
  ],
} as Meta<AlertFilterArchivedUiComponent>;

const Template: Story<AlertFilterArchivedUiComponent> = (
  args: AlertFilterArchivedUiComponent,
) => ({
  component: AlertFilterArchivedUiComponent,
  props: args,
});

export const Filters = Template.bind({});
Filters.args = {};
