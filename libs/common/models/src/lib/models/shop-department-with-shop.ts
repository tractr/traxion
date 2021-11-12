import { Shop, ShopDepartment } from '../generated';

export class ShopDepartmentWithShop extends ShopDepartment {
  shop!: Shop;
}
