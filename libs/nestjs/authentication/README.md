# nestjs-authentication

## Installation

To install this librairy you have to install it first via npm, yarn or pnpm and
install the required peerdependency `@trxn/nestjs-database`

```bash
npm i --save @trxn/nestjs-authentication @trxn/nestjs-database`
```

After that you need to register the module into your main application.
You'll need a UserService class provider register in your app (you can user the
USER_SERVICE token generate by `hapify-templates-nestjs-models-common`).

> app.module.ts

```typescript
import { Module } from '@nestjs/common';

import { AuthenticationModule } from '@trxn/nestjs-authentication';
import { DatabaseModule } from '@trxn/nestjs-database';

@Module({
  imports: [DatabaseModule.register(), AuthenticationModule.register({
    userService: 'USER_SERVICE',
  })],
  controllers: [],
  providers: [{ provide: 'USER_SERVICE', useClass: MyUserService }],
})
export class AppModule {}
```

You can override some options inside the register function.

## Configuration

Futhermore you need to tell to nestjs to authenticate all your route. To do that
you need to register the global auth guard from nestjs-authentication:

```typescript
import {
  AuthenticationModule,
  JwtGlobalAuthGuard,
} from '@trxn/nestjs-authentication';

@Module({
  imports: [DatabaseModule.register(), AuthenticationModule.register()],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtGlobalAuthGuard,
    },
  ],
})
export class AppModule {}
```

In the future more global auth guard will be added to the authentication
package.

## Cookie authentication

You need if you want to use the authentication from cookie to add the cookie
parser package to your app module. You can look at the
[nestjs documentation](https://docs.nestjs.com/techniques/cookies#cookies).
**You must provide one or more secret to the cookie-parser package**,
`nestjs-authentication use only signedCookie in production mode.

```typescript
import * as cookieParser from 'cookie-parser';
// somewhere in your initialization file
app.use(cookieParser('myScret'));
```

## Bcrypt online generator

To be able to test you can use these [bcrypt online generator](https://www.browserling.com/tools/bcrypt) to crypt your password.

## Running unit tests

Run `nx test nestjs-authentication` to execute the unit tests via
[Jest](https://jestjs.io).
