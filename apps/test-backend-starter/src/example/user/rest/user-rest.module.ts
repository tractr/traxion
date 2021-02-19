import { DatabaseModule } from '@tractr/hapify-plugin-nestjs-database';
import { UserModelModuleProvidersList } from '../common';
import { UserRestDtoService } from './services';
import { UserController } from './controllers';

export const UserRestModuleImportsList = [DatabaseModule];
export const UserRestModuleProvidersList = [
  UserRestDtoService,
  ...UserModelModuleProvidersList,
];
export const UserRestModuleControllersList = [UserController];
