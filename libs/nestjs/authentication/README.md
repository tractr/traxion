# Authentication Module

The nestjs-authentication module is that will handle your authentication. It will
by give you access to some standard guard to use jwt and login based strategy
authentication. Under the hood this module use jwt and passport to authenticate
the connections.

## Installation

You can install the nestjs-authentication module using npm:

```bash
npm install --save @trxn/nestjs-authentication
````

## Getting Started

In your workspace create you own AuthenticationModule that will configure the AuthenticationModule.

```typescript
import { Module } from '@nestjs/common';

import { AuthenticationModule } from '@trxn/nestjs-authentication';
import { UserModule } from './user.module';

@Module({
  imports: [AuthenticationModule.register({
    imports: [UserModule]
  })],
})
export class AppModule {}
```

The UserModule here is the UserModule provided by `@trxn/nestjs-user` and that expose
a UserService. You can use your own UserService class by providing it directly in the options:

```typescript
import { Module } from '@nestjs/common';

import { AuthenticationModule } from '@trxn/nestjs-authentication';
import { UserModule } from './user.module';

@Module({
  imports: [AuthenticationModule.register({
    UserService: MyUserServiceClass
  })],
})
export class AppModule {}
```

The UserService property respect the nestjs Provider type.

## Configuration

After the first configuration your routes are not yet protected. Authentication Module
give access to you to some guard class that you can use across your project. One of
the best method to authenticate your application is to force the authentication to
all the routes of your application and whitelist only the route that you need to be
public. To do so AuthenticationModule give you access a guard and a decorator `@Public`
to mark the route as public.

Here an example to authenticate all your routes:

```typescript
import {
  AuthenticationModule,
  JwtGlobalAuthGuard,
} from '@trxn/nestjs-authentication';

@Module({
  imports: [
    AuthenticationModule.register(
      //... provide a UserService class
    ),
  ],
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

## CustomUserSelect

The AuthenticationModule is responsible to hydrate you user when a request hit your api.
Some time you don't want only the user but you want to join some data attached to it.
This module let you configured a object that will be used in junction with the `UserService``
provided to select the information to use to fetch the user.

```ts
@Module({
  imports: [
    AuthenticationModule.register(
      //... the UserService configuration

      customSelect: {
        id: true,
        roles: true,
        profile: {
          name: true,
          address: true,
          // ...
        }
      }
    ),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtGlobalAuthGuard,
    },
  ],
})
export cla

## Cookie authentication

You need if you want to use the authentication from cookie to add the cookie
parser package to your app module. You can look at the
[nestjs documentation](https://docs.nestjs.com/techniques/cookies#cookies).
**You must provide one or more secret to the cookie-parser package**,
`nestjs-authentication` use only signedCookie in production mode.

```typescript
import * as cookieParser from 'cookie-parser';
// somewhere in your initialization file
app.use(cookieParser('myScret'));
```

## Encryption

By default AuthenticationModule use Bcrypt to parse and read the password.
If you need to use something else you can provide to the AuthenticationModule your own
`EncryptionService` that need to implement a `compare` and a `hash` method.

```ts
@Module({
  imports: [
    AuthenticationModule.register(
      //... provide a UserService class
      EncryptionService: EncryptionService
    ),
  ],
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

You can look at the BcryptModule to found some example.

## Bcrypt online generator

To be able to test you can use these [bcrypt online generator](https://www.browserling.com/tools/bcrypt) to crypt your passwords.
