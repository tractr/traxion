import { Module } from "@nestjs/common";
import { MODELS_SERVICES_PROVIDERS } from "./models-services.providers";
import { ConfigurableModuleClass } from "./models-services.module-definition";

@
    @Module({
      providers: MODELS_SERVICES_PROVIDERS,
      exports: MODELS_SERVICES_PROVIDERS,
    })
    
export class ModelsServicesModules {
}
