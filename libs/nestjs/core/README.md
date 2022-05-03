# Nest JS - Core

This library regroups some utilities that is used accross nestjs packages

## Logger

You can find a `LoggerModule` that export a `LoggerService`. This module use
the `Logger` token from `@nestjs/common` to let you access directly from your DI
at the nestjs logging system. Under the hood the LoggerService extends the Logger
of nestjs and format correctly your messages.

```ts
import { LoggerModule } from '@tractr/nestjs-common';

import { MyService } from './my-service.service';

@Module({
  imports: [LoggerModule],
  providers: [MyService],
})
export class MyApp {}
```

```ts
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class MyService {
  constructor(private readonly logger: Logger) {}

  helloWorld() {
    this.logger.log('Hello World');
  }
}
```

If you need to access to more functionality of the `LoggerService` like the
`setContext` or `setMetadata` you will need to tell to typescript what interface
is used under the hood by the `Logger` token.

```ts
import { Inject, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class MyService {
  constructor(@Inject(Logger) private readonly logger: LoggerService) {
    this.setContext(MyService.name);
    this.setMetadata({ foo: 'bar' })
  }

  helloWorld() {
    this.logger.log('Hello World');

    // Updating the context
    this.logger.log('Hello World', 'One time override context');

    // Updating the context and add more metadata
    this.logger.log('Hello World', { bar: 'foo' }, 'One time override context');

    // Override the metadata
    this.logger.log('Hello World', { foo: 'foo' });
  }
}
```

This logger is intended to work with the winston logger to be able to output
correctly into the console in development and in an `ecs` format in production.

@see `@tractr/nestjs-winston` library for more information.

---

TODO: write some documentation on what are inside this package

This package contains the core utilities for our nestjs backend.
