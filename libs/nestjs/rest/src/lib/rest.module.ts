import { Module } from '@nestjs/common';

import {
  AlertFeedbackRestModule,
  AlertRestModule,
  CameraRestModule,
  CameraStatusRestModule,
  ClientRestModule,
  ItemCategoryRestModule,
  ShopDepartmentRestModule,
  ShopRestModule,
  ShopSectionRestModule,
  UserRestModule,
} from './generated';

import { CommonModule } from '@cali/nestjs-common';

const restModules = [
  AlertFeedbackRestModule,
  AlertRestModule,
  CameraRestModule,
  CameraStatusRestModule,
  ClientRestModule,
  ItemCategoryRestModule,
  ShopDepartmentRestModule,
  ShopRestModule,
  ShopSectionRestModule,
  UserRestModule,
];
@Module({
  imports: [CommonModule, ...restModules.map((module) => module.register())],
  exports: restModules,
})
export class RestModule {}
