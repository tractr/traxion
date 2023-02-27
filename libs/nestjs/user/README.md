# User Module

The nestjs-user module is a wrapper module around the UserService that will be used
in another `@trxn/nestjs-` user based packages. This module ask you to provide a
UserService that need to implement an interface to be used to fetch and update a user

## Installation

You can install the nestjs-user module using npm:

```bash
npm install --save @trxn/nestjs-user
````

## Getting Started

In your workspace create you own UserModule that will import, configure and export
your own UserModule:

```ts
import { Module } from '@nestjs/common';
import { UserModule as TraxionUserModule } from '@trxn/nestjs-user';

@Module({
  imports: [
    TraxionUserModule.register({
      UserService: {
        provide: USER_SERVICE, 
        useClass: UserService, // Provide a class that implement UserService interface
      }
    }),
  ],
  exports: [TraxionUserModule],
})
export class UserModule {}
```

The interface to respect is the following one:

```ts
export type User = {
  [key: string]: unknown;
};

export type MinimalUser = User & {
  id: UserId;
  email: string;
  password: string;
};

export interface UserOrmService {
  findUnique<U extends User = MinimalUser>(params: {
    where: {
      id?: UserId;
      [key: string]: unknown;
    };
    select?: {
      [key: string]: unknown;
    };
  }): Promise<U | null>;

  update<U extends User = MinimalUser>(params: {
    where: {
      id?: UserId;
      [key: string]: unknown;
    };
    data?: {
      [key: string]: unknown;
    };
  }): Promise<U>;
}
```

The `UserService` module options respect the `Provider` type from `@nestjs/common` so you can use `useFactory`, `useFactory` or `useExisting`.

For the last one to use `useExisting` you can use the `imports` or `providers` module options to add to the `TraxionUserModule` the existing provider. If the imports module export a `USER_SERVICE` token you are not required to use the `UserService` module option. Let's take an exemple:

```ts
@Module({
  providers: {
    provide: USER_SERVICE,
    useClass: MyOwnUserOrmService, // Implement UserOrmService interface
  },
  exports: [USER_SERVICE],
})
export class ModelsModule {}

@Module({
  imports: [
    TraxionUserModule.register({
      imports: [ModelsModule], // Import your module with the USER_SERVICE token exported
      
      // You can also import your provider directly:
      providers: [{
        provide: USER_SERVICE,
        useClass: MyOwnUserOrmService, // Implement UserOrmService interface
      }]
    }),
  ],
  exports: [TraxionUserModule],
})
export class UserModule {}
```
