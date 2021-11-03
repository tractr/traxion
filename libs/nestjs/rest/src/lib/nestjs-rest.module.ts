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

import { NestjsCommonModule } from '@cali/nestjs-common';

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
  imports: [
    NestjsCommonModule,
    ...restModules.map((module) => module.register()),
  ],
  exports: restModules,
})
export class NestjsRestModule {}
