import {
  DynamicModule,
  ForwardReference,
  Provider,
  Type,
} from '@nestjs/common';
import {
  UserRestModuleControllersList,
  UserRestModuleImportsList,
  UserRestModuleProvidersList,
} from './rest';

export const UserModuleImportsList: Array<
  Type | DynamicModule | Promise<DynamicModule> | ForwardReference
> = UserRestModuleImportsList;
export const UserModuleProvidersList: Provider[] = UserRestModuleProvidersList;
export const UserModuleControllersList: Type[] = UserRestModuleControllersList;
