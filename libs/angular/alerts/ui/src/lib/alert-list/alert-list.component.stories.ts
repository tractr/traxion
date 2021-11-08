import { TranslateModule } from '@ngx-translate/core';
import { Meta, moduleMetadata, Story } from '@storybook/angular';

import { AlertListItemComponent } from '../alert-list-item/alert-list-item.component';
import { AlertListComponent } from './alert-list.component';

import { AngularCommonUiModule } from '@cali/angular-common-ui';
import { mockAlertFactory } from '@cali/common-models';

/** Mock common */
const alerts = [mockAlertFactory(), mockAlertFactory(), mockAlertFactory()];
/** Mock common */

export default {
  title: 'Alert/List Alerts',
  component: AlertListComponent,
  decorators: [
    moduleMetadata({
      declarations: [AlertListItemComponent],
      imports: [AngularCommonUiModule, TranslateModule.forRoot()],
    }),
  ],
} as Meta<AlertListComponent>;

const Template: Story<AlertListComponent> = (args: AlertListComponent) => ({
  component: AlertListComponent,
  props: args,
});

/** Storie many random alerts */
export const SimpleList = Template.bind({});
SimpleList.args = { alerts };
