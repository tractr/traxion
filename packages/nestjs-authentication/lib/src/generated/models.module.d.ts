import { ModuleOverride } from '@tractr/hapify-plugin-nestjs-core';
import { UserModule } from './user';
export declare class ModelsModule extends ModuleOverride {
    static dependencies: (typeof UserModule)[];
}
