import { TranslateModule } from '@ngx-translate/core';
import { Meta, moduleMetadata, Story } from '@storybook/angular';

import { AlertListItemUiComponent } from '../alert-list-item-ui/alert-list-item-ui.component';
import { AlertListUiComponent } from './alert-list-ui.component';

import { AngularCommonUiModule } from '@cali/angular-common-ui';
import { mockAlertFactory } from '@cali/common-models';

/** Mock common */
const alerts = [mockAlertFactory(), mockAlertFactory(), mockAlertFactory()];
/** Mock common */

export default {
  title: 'Alert/List Alerts',
  component: AlertListUiComponent,
  decorators: [
    moduleMetadata({
      declarations: [AlertListItemUiComponent],
      imports: [AngularCommonUiModule, TranslateModule.forRoot()],
    }),
  ],
} as Meta<AlertListUiComponent>;

const Template: Story<AlertListUiComponent> = (args: AlertListUiComponent) => ({
  component: AlertListUiComponent,
  props: args,
});

/** Storie many random alerts */
export const SimpleList = Template.bind({});
SimpleList.args = { alerts };
