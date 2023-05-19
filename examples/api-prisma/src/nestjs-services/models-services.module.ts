import { Module } from '@nestjs/common';

import { ConfigurableModuleClass } from './models-services.module-definition';
import { MODELS_SERVICES_PROVIDERS } from './models-services.providers';
import { EncryptionService } from './services';

@Module({
  providers: [...MODELS_SERVICES_PROVIDERS, EncryptionService],
  exports: [...MODELS_SERVICES_PROVIDERS, EncryptionService],
})
export class ModelsServicesModule extends ConfigurableModuleClass {}
