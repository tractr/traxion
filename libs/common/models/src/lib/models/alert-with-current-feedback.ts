import { AlertFeedback } from '@prisma/client';

import { Alert } from '../generated';
import { CameraWithShopSection } from './camera-with-shop-section';

export class AlertWithCurrentFeedback extends Alert {
  camera!: CameraWithShopSection;

  alertFeedbacks!: [AlertFeedback];
}
