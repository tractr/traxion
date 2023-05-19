import { ConfigurableModuleBuilder } from '@nestjs/common';

import { ModelsServicesModuleOptions } from './models-services.module-options';

import { addImportsExtra, ImportsExtra } from '@trxn/nestjs-core';

export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
  ASYNC_OPTIONS_TYPE,
  OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<ModelsServicesModuleOptions>()
  .setExtras<ImportsExtra>(
    { imports: [] },
    addImportsExtra((definition) => definition),
  )
  .build();
