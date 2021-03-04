import { ModuleOverride } from '@tractr/nestjs-core';
import { UserModelModule } from '../common';
import { UserController } from './controllers';
export declare class UserRestModule extends ModuleOverride {
    static controllers: {
        provide: string;
        useClass: typeof UserController;
    }[];
    static dependencies: (typeof UserModelModule)[];
}
