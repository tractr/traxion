import { Module } from '@nestjs/common';

import { AlertModelModule } from './alert';
import { AlertFeedbackModelModule } from './alert-feedback';
import {
  CameraModelModule,
  CameraStatusModelModule,
  ClientModelModule,
  ItemCategoryModelModule,
  ShopDepartmentModelModule,
  ShopModelModule,
  ShopSectionModelModule,
  UserModelModule,
} from './generated';

const modelModules = [
  AlertModelModule,
  AlertFeedbackModelModule,
  CameraModelModule,
  CameraStatusModelModule,
  ClientModelModule,
  ItemCategoryModelModule,
  ShopDepartmentModelModule,
  ShopModelModule,
  ShopSectionModelModule,
  UserModelModule,
];

@Module({
  imports: modelModules.map((module) => module.register()),
  exports: modelModules,
})
export class CommonModule {}
