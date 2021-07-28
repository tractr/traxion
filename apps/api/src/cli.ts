import { BootstrapConsole } from 'nestjs-console';

import { AppModule } from './app/app.module';

import { Logger } from '@tractr/nestjs-core';

const bootstrap = new BootstrapConsole({
  module: AppModule,
  useDecorators: true,
  contextOptions: {
    logger: ['verbose', 'warn', 'error'],
  },
});

/* eslint-disable @typescript-eslint/no-floating-promises */
bootstrap.init().then(async (app) => {
  const logger = new Logger();
  let exitCode = 0;
  try {
    await app.init();
    app.useLogger(logger);
    await bootstrap.boot();
  } catch (e) {
    console.error(e);
    exitCode = 1;
  } finally {
    await app.close();
    process.exit(exitCode);
  }
});
