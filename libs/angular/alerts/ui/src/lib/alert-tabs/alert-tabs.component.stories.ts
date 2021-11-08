import { TranslateModule } from '@ngx-translate/core';
import { Meta, moduleMetadata, Story } from '@storybook/angular';

import { AlertFilterArchivedComponent } from '../alert-filter-archived/alert-filter-archived.component';
import { AlertListComponent } from '../alert-list/alert-list.component';
import { AlertTabsComponent } from './alert-tabs.component';

import { AngularCommonUiModule } from '@cali/angular-common-ui';

export default {
  title: 'Alert/Tabs Alerts',
  component: AlertTabsComponent,
  decorators: [
    moduleMetadata({
      declarations: [AlertFilterArchivedComponent, AlertListComponent],
      imports: [AngularCommonUiModule, TranslateModule.forRoot()],
    }),
  ],
} as Meta<AlertTabsComponent>;

const Template: Story<AlertTabsComponent> = (args: AlertTabsComponent) => ({
  component: AlertTabsComponent,
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
