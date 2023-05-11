import { Module } from '@nestjs/common';

import { ConfigurableModuleClass } from './authorized-services.module-definition';
import { AUTHORIZED_SERVICES_PROVIDERS } from './authorized-services.providers';
import {
  DEFAULT_OWNERSHIP_SELECT,
  DefaultOwnershipSelectProvider,
} from './services';

@Module({
  providers: [...AUTHORIZED_SERVICES_PROVIDERS, DefaultOwnershipSelectProvider],
  exports: [...AUTHORIZED_SERVICES_PROVIDERS, DEFAULT_OWNERSHIP_SELECT],
})
export class AuthorizedServicesModule extends ConfigurableModuleClass {}
