import { Module } from "@nestjs/common";
import { ConfigurableModuleClass } from "./models-services.module-definition";
import { MODELS_SERVICES_PROVIDERS } from "./models-services.providers";

@Module({
      providers: MODELS_SERVICES_PROVIDERS,
      exports: MODELS_SERVICES_PROVIDERS,
    })
export class ModelsServicesModules extends ConfigurableModuleClass {
}
