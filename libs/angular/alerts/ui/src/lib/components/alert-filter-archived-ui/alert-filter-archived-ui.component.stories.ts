import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { Meta, moduleMetadata, Story } from '@storybook/angular';

import { AlertFilterArchivedUiComponent } from './alert-filter-archived-ui.component';

import { AngularCommonUiModule } from '@cali/angular-common-ui';

export default {
  title: 'Alert/Alert Filter Archived',
  component: AlertFilterArchivedUiComponent,
  decorators: [
    moduleMetadata({
      imports: [
        AngularCommonUiModule,
        BrowserModule,
        BrowserAnimationsModule,
        TranslateModule,
      ],
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
