import { TranslateModule } from '@ngx-translate/core';
import { Meta, moduleMetadata, Story } from '@storybook/angular';

import { AlertFilterArchivedComponent } from './alert-filter-archived.component';

import { AngularCommonUiModule } from '@cali/angular-common-ui';

export default {
  title: 'Alert/Alert Filter Archived',
  component: AlertFilterArchivedComponent,
  decorators: [
    moduleMetadata({
      imports: [AngularCommonUiModule, TranslateModule.forRoot()],
    }),
  ],
} as Meta<AlertFilterArchivedComponent>;

const Template: Story<AlertFilterArchivedComponent> = (
  args: AlertFilterArchivedComponent,
) => ({
  component: AlertFilterArchivedComponent,
  props: args,
});

export const Filters = Template.bind({});
Filters.args = {};
