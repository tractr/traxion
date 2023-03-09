---
id: nestjs-services
title: Nestjs Services
sidebar_label: Nestjs Services
---

## @trxn/prisma-nestjs-services-generator

The `@trxn/prisma-nestjs-services-generator` package is a Prisma generator that allows you to generate NestJS services and modules based on your Prisma schema. The generated services and module provide a clean interface that you can use across your project, and they also manage the default values configured in your Prisma schema.

Installation
To use `@trxn/prisma-nestjs-services-generator`, you must first install it as a dev dependency in your project:

```bash
npm install --save-dev @trxn/prisma-nestjs-services-generator
```

## Configuration

To use the `@trxn/prisma-nestjs-services-generator` package, you must add it to the generator section of your Prisma schema file:

```prisma
generator trxnNestjsServices {
  provider = "@trxn/prisma-nestjs-services-generator"
  output = "../generated/nestjs-services"
}
```

The available configuration options are:

* `output`: Specifies the output directory for the generated services and modules. Defaults to the current working directory.

## Usage

After adding `@trxn/prisma-nestjs-services-generator` to your Prisma schema file and configuring it, you can generate the NestJS services and modules by running the following command:

```bash
npx prisma generate
```

This will generate a set of TypeScript files in the directory specified by the output configuration option. These files will include a module for all the models in your Prisma schema.

You can then import these generated services and modules into your NestJS application and use them as you would any other service or module.

You'll need to configure a prisma client to let know to the `ModelsModule` the prisma client to use. You have two options to
configured it. The first one is to give to the module an instance of a prisma client that you managed by yourself with the
`prismaClient` options. The second is to provide a PrismaService to the module. You can find more information in the
database module documentation.

```ts
import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ModelsModule } from './generated/nestjs-services';

@Module({
  imports: [ModelsModule.register({
    prismaClient: new PrismaClient();
  })],
})
export class AppModule {}
```

Or with the `DatabaseModule`:

```ts
import { Module } from '@nestjs/common';
import { DatabaseModule } from '@trxn/nestjs-database';
import { ModelsModule } from './generated/nestjs-services';

@Module({
  imports: [ModelsModule.register({
    imports: [DatabaseModule], // This module have to export a PrismaService from '@trxn/nestjs-database' module
  })],
})
export class AppModule {}
```

After that you will have access to your code the services configured with prisma:

```ts
import { Injectable } from '@nestjs/common';
import { UserService } from './generated/nestjs-services';

@Injectable()
export class UserService {
  constructor(private readonly userService: UserService) {}

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.userService.create({ data });
  }

  async findUserById(id: string): Promise<User | null> {
    return this.userService.findUnique({ where: { id } });
  }
}
```

## Conclusion

The `@trxn/prisma-nestjs-services-generator` package provides a convenient way to generate NestJS services and modules based on your Prisma schema. By using the generated services and modules, you can create a clean interface that you can use across your project and that manages the default values configured in your Prisma schema.
