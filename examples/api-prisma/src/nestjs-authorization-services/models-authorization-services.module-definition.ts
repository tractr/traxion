import { ConfigurableModuleBuilder } from '@nestjs/common';

import { AuthorizationServicesModuleOptions } from './types/authorization-services-module-options';

import { addImportsExtra, ImportsExtra } from '@trxn/nestjs-core';

export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
  ASYNC_OPTIONS_TYPE,
  OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<AuthorizationServicesModuleOptions>()
  .setExtras<ImportsExtra>(
    { imports: [] },
    addImportsExtra((definition) => definition),
  )
  .build();
