import { ModuleMetadata } from '@nestjs/common';
import { MODULE_METADATA } from '@nestjs/common/constants';

export function getMetadataFromModule<T>(module: T): ModuleMetadata {
  return {
    imports: Reflect.getMetadata(MODULE_METADATA.IMPORTS, module ?? {}),
    exports: Reflect.getMetadata(MODULE_METADATA.EXPORTS, module ?? {}),
    providers: Reflect.getMetadata(MODULE_METADATA.PROVIDERS, module ?? {}),
    controllers: Reflect.getMetadata(MODULE_METADATA.CONTROLLERS, module ?? {}),
  };
}
