import {
  ConfigurableModuleBuilder,
  DynamicModule,
  ForwardReference,
  Provider,
  Type,
} from '@nestjs/common';

import { ModelsServicesOptions } from './interfaces';

export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
  ASYNC_OPTIONS_TYPE,
  OPTIONS_TYPE,
}: Provider[] = new ConfigurableModuleBuilder<ModelsServicesOptions>()
  .setExtras<{
    imports: Array<
      Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference
    >;
    providers?: Provider<any>[] | undefined;
  }>(
    {
      imports: [],
      providers: [],
    },
    (options, extras) => ({
      ...options,
      imports: [...(options.imports || []), ...(extras.imports || [])],
      providers: [...(options.providers || []), ...(extras.providers || [])],
    }),
  )
  .build();
