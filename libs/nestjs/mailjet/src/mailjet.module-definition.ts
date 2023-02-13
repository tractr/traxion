import { ConfigurableModuleBuilder } from '@nestjs/common';

import { MailjetModuleOptions } from './interfaces';

export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
  ASYNC_OPTIONS_TYPE,
  OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<MailjetModuleOptions>().build();
