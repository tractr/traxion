import { ModuleOverride } from '@tractr/hapify-plugin-nestjs-core';
import { UserModelModule } from '../common';
import { UserController } from './controllers';
export declare class UserRestModule extends ModuleOverride {
    static controllers: {
        provide: string;
        useClass: typeof UserController;
    }[];
    static dependencies: (typeof UserModelModule)[];
}
