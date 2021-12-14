import { Alert } from '../generated';
import { AlertFeedback } from './alert-feedback';
import { CameraWithShopSection } from './camera-with-shop-section';

export class AlertWithCurrentFeedback extends Alert {
  camera!: CameraWithShopSection;

  alertFeedbacks!: AlertFeedback[];
}
