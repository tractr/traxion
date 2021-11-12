import { ShopSection } from '../generated';
import { ShopDepartmentWithShop } from './shop-department-with-shop';

export class ShopSectionWithDepartment extends ShopSection {
  shopDepartment!: ShopDepartmentWithShop;
}
