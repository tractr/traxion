import { TranslateModule } from '@ngx-translate/core';
import { Meta, moduleMetadata, Story } from '@storybook/angular';

import { AlertListItemUiComponent } from './alert-list-item-ui.component';

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
const alertFeedbackWithoutType = mockAlertFeedbackFactory({ type: null });
const alertFeedbackWithType = mockAlertFeedbackFactory({ type: 'thief' });
const alertFeedbackArchived = mockAlertFeedbackFactory({ isArchived: true });

const alert = mockAlertFactory({
  alertFeedbacks: [alertFeedback],
  camera: { ...camera },
});
/** Mock common */

const baseProps = (
  override: Partial<ItemListAlertsIO> = {},
): ItemListAlertsIO => ({ alert, ...override });

export default {
  title: 'Alert/Item List Alert',
  component: AlertListItemUiComponent,
  decorators: [
    moduleMetadata({
      imports: [AngularCommonUiModule, TranslateModule.forRoot()],
    }),
  ],
} as Meta<AlertListItemUiComponent>;

const Template: Story<AlertListItemUiComponent> = (
  args: AlertListItemUiComponent,
) => ({
  component: AlertListItemUiComponent,
  props: args,
});

/** Storie new alert without video available */
const alertNewWithoutVideo = mockAlertFactory({
  alertFeedbacks: [alertFeedbackWithoutType],
  camera: { ...camera },
  videoStatus: 'generationStarted',
});
export const NewAlertWithoutVideo = Template.bind({});
NewAlertWithoutVideo.args = baseProps({ alert: { ...alertNewWithoutVideo } });

/** Storie new alert with video available */
const alertNewWithVideo = mockAlertFactory({
  alertFeedbacks: [alertFeedbackWithoutType],
  camera: { ...camera },
  videoStatus: 'videoAvailable',
  videoUrl:
    'https://media4.giphy.com/media/ZCKh7knqLpc4M/giphy.mp4?cid=ecf05e47nufvrkk9iqf2ngktbwhq2at2nsd2sq6kyobeh3oz&rid=giphy.mp4&ct=g',
});
export const NewAlertWithVideo = Template.bind({});
NewAlertWithVideo.args = baseProps({ alert: { ...alertNewWithVideo } });

/** Storie alert in progress without video available */
const alertInProgressWithoutVideo = mockAlertFactory({
  alertFeedbacks: [alertFeedbackWithType],
  camera: { ...camera },
  videoStatus: 'generationStarted',
});
export const InProgressAlertWithoutVideo = Template.bind({});
InProgressAlertWithoutVideo.args = baseProps({
  alert: { ...alertInProgressWithoutVideo },
});

/** Storie alert in progress with video available */
const alertInProgressWithVideo = mockAlertFactory({
  alertFeedbacks: [alertFeedbackWithType],
  camera: { ...camera },
  videoStatus: 'videoAvailable',
  videoUrl:
    'https://media4.giphy.com/media/ZCKh7knqLpc4M/giphy.mp4?cid=ecf05e47nufvrkk9iqf2ngktbwhq2at2nsd2sq6kyobeh3oz&rid=giphy.mp4&ct=g',
});
export const InProgressAlertWithVideo = Template.bind({});
InProgressAlertWithVideo.args = baseProps({
  alert: { ...alertInProgressWithVideo },
});

/** Storie alert archived without video available */
const alertArchivedWithoutVideo = mockAlertFactory({
  alertFeedbacks: [alertFeedbackArchived],
  camera: { ...camera },
  videoStatus: 'generationStarted',
});
export const ArchivedAlertWithoutVideo = Template.bind({});
ArchivedAlertWithoutVideo.args = baseProps({
  alert: { ...alertArchivedWithoutVideo },
});

/** Storie alert archived with video available */
const alertArchivedWithVideo = mockAlertFactory({
  alertFeedbacks: [alertFeedbackArchived],
  camera: { ...camera },
  videoStatus: 'videoAvailable',
  videoUrl:
    'https://media4.giphy.com/media/ZCKh7knqLpc4M/giphy.mp4?cid=ecf05e47nufvrkk9iqf2ngktbwhq2at2nsd2sq6kyobeh3oz&rid=giphy.mp4&ct=g',
});
export const ArchivedAlertWithVideo = Template.bind({});
ArchivedAlertWithVideo.args = baseProps({
  alert: { ...alertArchivedWithVideo },
});
