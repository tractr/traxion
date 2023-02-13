import { ConfigurableModuleBuilder } from '@nestjs/common';

import { MailerModuleOptions } from './interfaces';

import {
  addImportsAndProvidersTransformDefinition,
  ImportsAndProvidersSetExtras,
} from '@trxn/nestjs-core';

export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
  ASYNC_OPTIONS_TYPE,
  OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<MailerModuleOptions>()
  .setExtras<ImportsAndProvidersSetExtras>(
    { imports: [], providers: [] },
    addImportsAndProvidersTransformDefinition,
  )
  .build();
