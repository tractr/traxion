import { Module } from '@nestjs/common';
import { ConfigurableModuleClass } from './authorized-services.module-definition';
import { AUTHORIZED_SERVICES_PROVIDERS } from './authorized-services.providers';

@Module({
  providers: AUTHORIZED_SERVICES_PROVIDERS,
  exports: AUTHORIZED_SERVICES_PROVIDERS,
})
export class AuthorizedServicesModules extends ConfigurableModuleClass {}
