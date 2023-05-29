import { ConfigurableModuleBuilder } from '@nestjs/common';

import { AuthorizedServicesModuleOptions } from './interfaces';

import { addImportsExtra, ImportsExtra } from '@trxn/nestjs-core';

export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
  ASYNC_OPTIONS_TYPE,
  OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<AuthorizedServicesModuleOptions>()
  .setExtras<ImportsExtra>(
    { imports: [] },
    addImportsExtra((definition) => definition),
  )
  .build();
