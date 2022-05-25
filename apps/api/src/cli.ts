import { BootstrapConsole } from 'nestjs-console';

import { AppModule } from './app/app.module';

const bootstrap = new BootstrapConsole({
  module: AppModule,
  useDecorators: true,
  contextOptions: {
    logger: ['verbose', 'warn', 'error'],
  },
});

/* eslint-disable @typescript-eslint/no-floating-promises */
bootstrap.init().then(async (app) => {
  let exitCode = 0;
  try {
    await app.init();
    await bootstrap.boot();
  } catch (e) {
    console.error(e);
    exitCode = 1;
  } finally {
    await app.close();
    process.exit(exitCode);
  }
});
