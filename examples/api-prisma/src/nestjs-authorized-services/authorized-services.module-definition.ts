import { ConfigurableModuleBuilder } from '@nestjs/common';
import { addImportsExtra, ImportsExtra } from '@trxn/nestjs-core';
import { AuthorizedServicesModuleOptions } from './interfaces';

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
