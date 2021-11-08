import { Module } from '@nestjs/common';
import { ModuleOverride } from '@tractr/nestjs-core';

import {
  ALERT_DATABASE_SERVICE,
  ALERT_SERVICE,
  alertDatabaseServiceFactory,
  alertDatabaseServiceInject,
} from '../generated';
import { AlertService } from './services';

const providers = [
  {
    provide: ALERT_SERVICE,
    useClass: AlertService,
  },
  {
    provide: ALERT_DATABASE_SERVICE,
    useFactory: alertDatabaseServiceFactory,
    inject: alertDatabaseServiceInject,
  },
];

@Module({
  exports: providers,
  providers,
})
export class AlertModelModule extends ModuleOverride {}
