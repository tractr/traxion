import { ConfigurableModuleBuilder } from '@nestjs/common';

import { FileStorageConfigurationPublic } from './interfaces';


export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
  ASYNC_OPTIONS_TYPE,
  OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<FileStorageConfigurationPublic>().build();
