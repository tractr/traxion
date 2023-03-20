import { Module } from '@nestjs/common';

import { ConfigurableModuleClass } from './models-authorization-services.module-definition';
import { MODELS_SERVICES_PROVIDERS } from './models-authorization-services.providers';

@Module({
  providers: MODELS_SERVICES_PROVIDERS,
  exports: MODELS_SERVICES_PROVIDERS,
})
export class ModelsAuthorizationServicesModules extends ConfigurableModuleClass {}
