import { Module } from '@nestjs/common';

import { AlertWithCurrentFeedbackRestModule } from './alert-with-current-feedback';
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

const generatedRestModules = [
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
  imports: [
    CommonModule,
    AlertWithCurrentFeedbackRestModule,
    ...generatedRestModules.map((module) => module.register()),
  ],
  exports: [AlertWithCurrentFeedbackRestModule, ...generatedRestModules],
})
export class RestModule {}
