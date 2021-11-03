import { Module } from '@nestjs/common';

import {
  AlertFeedbackModelModule,
  AlertModelModule,
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
  AlertFeedbackModelModule,
  AlertModelModule,
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
export class NestjsCommonModule {}
