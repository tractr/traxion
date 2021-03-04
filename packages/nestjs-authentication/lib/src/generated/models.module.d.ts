import { ModuleOverride } from '@tractr/nestjs-core';
import { UserModule } from './user';
export declare class ModelsModule extends ModuleOverride {
    static dependencies: (typeof UserModule)[];
}
