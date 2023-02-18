import { ConfigurableModuleBuilder } from '@nestjs/common';

import { UntypedCaslModuleOptions } from './interfaces';

export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
  ASYNC_OPTIONS_TYPE,
  OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<UntypedCaslModuleOptions>().build();

export type ExtractExtraModuleDefinitionOptions<T> =
  T extends UntypedCaslModuleOptions & Partial<infer U> ? U : never;

export type ExtraModuleDefinitionOptions = ExtractExtraModuleDefinitionOptions<
  typeof OPTIONS_TYPE
>;
