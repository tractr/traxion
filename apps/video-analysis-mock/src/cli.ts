import { Logger } from '@tractr/nestjs-core';
import { BootstrapConsole } from 'nestjs-console';

import { CliModule } from './cli/cli.module';

const bootstrap = new BootstrapConsole({
  module: CliModule,
  useDecorators: true,
  contextOptions: {
    logger: ['warn', 'error'],
  },
});

/* eslint-disable @typescript-eslint/no-floating-promises */
bootstrap.init().then(async (app) => {
  const logger = new Logger();
  try {
    await app.init();
    app.useLogger(logger);
    await bootstrap.boot();
  } catch (e) {
    logger.error(e);
  }
});
