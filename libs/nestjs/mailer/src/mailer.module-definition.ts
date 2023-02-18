import { ConfigurableModuleBuilder } from '@nestjs/common';

import { MAILER_CLIENT } from './constants';
import { MailerClient, MailerModuleOptions } from './interfaces';

import {
  addImportsAndProvidersExtra,
  addProviderWithInjectionTokenExtra,
  ImportsExtra,
  ProvidersExtra,
  ProviderWithInjectionToken,
} from '@trxn/nestjs-core';

export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
  ASYNC_OPTIONS_TYPE,
  OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<MailerModuleOptions>()
  .setExtras<
    ImportsExtra &
      ProvidersExtra & {
        MailerClient?: ProviderWithInjectionToken<
          typeof MAILER_CLIENT,
          MailerClient
        >;
      }
  >(
    { imports: [], providers: [] },
    addImportsAndProvidersExtra((definition, { MailerClient: Client }) =>
      addProviderWithInjectionTokenExtra(definition, MAILER_CLIENT, Client),
    ),
  )
  .build();
