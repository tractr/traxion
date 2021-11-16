import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { Meta, moduleMetadata, Story } from '@storybook/angular';

import { AlertDetailsUiComponent } from './alert-details-ui.component';

import { AngularCommonUiModule } from '@cali/angular-common-ui';
import {
  Alert,
  mockAlertFactory,
  mockAlertFeedbackFactory,
  mockCameraFactory,
  mockItemCategoryFactory,
  mockShopDepartmentFactory,
  mockShopSectionFactory,
} from '@cali/common-models';

interface ItemListAlertsIO {
  alert: Alert;
}

/** Mock common */
const itemCategory = mockItemCategoryFactory();
const shopDepartment = mockShopDepartmentFactory();
const shopSection = mockShopSectionFactory({
  shopDepartment: { ...shopDepartment },
  itemCategory: { ...itemCategory },
});
const camera = mockCameraFactory({ shopSection: { ...shopSection } });

const alertFeedback = mockAlertFeedbackFactory();

const alert = mockAlertFactory({
  alertFeedbacks: [alertFeedback],
  camera: { ...camera },
});
/** Mock common */

const baseProps = (
  override: Partial<ItemListAlertsIO> = {},
): ItemListAlertsIO => ({ alert, ...override });

export default {
  title: 'Alert/Details',
  component: AlertDetailsUiComponent,
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
} as Meta<AlertDetailsUiComponent>;

const Template: Story<AlertDetailsUiComponent> = (
  args: AlertDetailsUiComponent,
) => ({
  component: AlertDetailsUiComponent,
  props: args,
});

/** Storie alert without video available */
const alertDetailsWithoutVideo = mockAlertFactory({
  alertFeedbacks: [alertFeedback],
  camera: { ...camera },
  videoStatus: 'generationStarted',
});
export const AlertDetailsWithoutVideo = Template.bind({});
AlertDetailsWithoutVideo.args = baseProps({
  alert: { ...alertDetailsWithoutVideo },
});

/** Storie alert with video available */
const alertDetailsWithVideo = mockAlertFactory({
  alertFeedbacks: [alertFeedback],
  camera: { ...camera },
  videoStatus: 'videoAvailable',
  videoUrl:
    'https://media4.giphy.com/media/ZCKh7knqLpc4M/giphy.mp4?cid=ecf05e47nufvrkk9iqf2ngktbwhq2at2nsd2sq6kyobeh3oz&rid=giphy.mp4&ct=g',
});
export const AlertDetailsWithVideo = Template.bind({});
AlertDetailsWithVideo.args = baseProps({ alert: { ...alertDetailsWithVideo } });

/** Storie alert with video deleted */
const alertDetailsWithVideoDeleted = mockAlertFactory({
  alertFeedbacks: [alertFeedback],
  camera: { ...camera },
  videoStatus: 'videoDeleted',
  videoUrl:
    'https://media4.giphy.com/media/ZCKh7knqLpc4M/giphy.mp4?cid=ecf05e47nufvrkk9iqf2ngktbwhq2at2nsd2sq6kyobeh3oz&rid=giphy.mp4&ct=g',
});
export const AlertDetailsWithVideoDeleted = Template.bind({});
AlertDetailsWithVideoDeleted.args = baseProps({
  alert: { ...alertDetailsWithVideoDeleted },
});
