# nestjs-winston

This library is intend to provide some helpful function to work with the stack's
logger and winston. Be sure to read the logger documentation before to read this doc.

This library provide a wrapper around winston take the input from nestjs and
format them correctly to be ingested by winston. It provide a function helper
to instantiate and pass the class to nestjs.

Next to that this package provide a winston format helper to output the logs
like nestjs when you are in development.

## Configure your nestjs app

An example of how to use the two helpers 

```ts
import {
  createWinstonLogger,
  nestLikeConsoleFormat,
} from '@tractr/nestjs-winston';

// Bootstrap the main application
async function bootstrap() {
  const logger = createWinstonLogger({
    // options (same as WinstonModule.forRoot() options)
    level,
    format: development
      ? nestLikeConsoleFormat('Stack', { prettyPrint: true })
      : ecsFormat(),
    transports: [new winston.transports.Console()],
  });

  // Instantiate nest app
  const app = await NestFactory.create(AppModule, {
    logger,
  });

  // Bonus to use winston with morgan:
  app.use(
    morgan('combined', {
      stream: { write: (str: string) => logger.log(str) },
    }),
  );

  await app.listen(3000);
}
```

## Running unit tests

Run `nx test nestjs-winston` to execute the unit tests via
[Jest](https://jestjs.io).

## Credits

Credits to [nest-winston](https://github.com/gremo/nest-winston).
