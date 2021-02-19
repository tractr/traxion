import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { uniq } from './common/helpers/unique-array.helper';
import {
  UserModuleControllersList,
  UserModuleImportsList,
  UserModuleProvidersList,
} from './user';

@Global()
@Module({})
export class ModelsModule {
  static register(overrideProviders: Provider[] = []): DynamicModule {
    const providers = uniq(
      [...UserModuleProvidersList].concat(overrideProviders)
    );
    return {
      module: ModelsModule,
      imports: uniq([...UserModuleImportsList]),
      exports: uniq([...UserModuleProvidersList]),
      providers,
      controllers: uniq([...UserModuleControllersList]),
    };
  }
}
