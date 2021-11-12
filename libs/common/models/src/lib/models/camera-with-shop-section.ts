import { Camera } from '../generated';
import { ShopSectionWithDepartment } from './shop-section-with-department';

export class CameraWithShopSection extends Camera {
  shopSection!: ShopSectionWithDepartment;
}
