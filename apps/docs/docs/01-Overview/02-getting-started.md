---
id: getting-started
title: Getting started
sidebar_label: Getting started
---

## Introduction

In this tutorial, we will learn how to generate code for a NestJS application from a Prisma schema using a set of
Node.js libraries. NestJS is a popular Node.js framework that provides a robust platform for building scalable and
modular applications. Prisma, on the other hand, is a modern ORM for Node.js that makes it easy to interact with
databases.

Let's get started!

## Pre-requisites

We will assume you are in a nestjs application with prisma configured. You can find information in the [nestjs documentation](https://docs.nestjs.com/recipes/prisma#set-up-prisma).

So for this getting started we'll assume you have a nestjs application configured with a prisma schema that is able to generate with the commande `npx prisma generate` and you database (sqlite, postgresql or other) is correctly link with prisma.

## Install the dependencies

Traxion is a (set of) prisma generator(s) that will leverage the information inside prisma to generate you a fully operational graphQL API. To use this generator we'll first install the traxion generator dependency:

```bash
npm i -D @trxn/prisma-traxion-generator
```

This generator generate code that use some node package to be fully operational. You must install this package in your app to be able to run the generated code:

```bash
npm i --save \
  @trxn/nestjs-database \
  @trxn/nestjs-casl \
  @trxn/nestjs-core \
  @trxn/nestjs-graphql \
  @nestjs/apollo \
  @nestjs/graphql \
  @paljs/plugins \
  @casl/ability \
  @casl/prisma \
  class-transformer
```

## Configure the generator inside the prisma schema

Add to your schema the following lines:

```prisma
generator traxion {
  provider         = "traxion-prisma-generator"
  // Relative to the schema.prisma file
  output           = "../src/generated"
  // Path relative to the output directory
  tsConfigFilePath = "../../tsconfig.json"
}
```

The `output` folder is the one who will host your generated files. Be careful to not add any code inside as he will be totally replaced each time you generate with prisma.

The `tsConfigFilePath` must point on a valid `tsconfig.json`. That will configured tsMorph correctly with your application typescript configuration.

Note: This generator make use of a specific `User` table with some constraint. In this getting started we'll not describe how to configured this user. Use this following minimal `User` when using this generator the first time:

```prisma
model User {
  id       Int    @id @default(autoincrement())
  email    String @unique
  /// @trxn/roles
  role     String @default("user")
  /// @trxn/hidden
  /// @trxn/encrypted
  password String
}
```

## Generate your code

Now that prisma is fully configured you can generate your code as normal when using prisma:

```bash
npx prisma generate
```

After the generation process ended you'll find the generated code inside the directory you configured in your schema.

Note: Traxion is not responsible to format the files. This process is inherent in each project so we advise you to add in your generate process a format step. It could be like that (`package.json`):

```json
{
  ...
  "scripts": {
    ...
    "generate": "npx prisma generate && npm run format"
  }
  ...
}
```

More importantly you should'nt version the generated code and let you CI/CD process do this step when deploying your app.

## Configure your nestjs app

Now you can import `TraxionModule` from the generated forlder and use it inside you `app.module.ts`:

```ts
import { Module } from '@nestjs/common';
import { TraxionModule } from './generated/modules/traxion.module';

@Module({
  imports: [TraxionModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
```

You can now start your app and enjoy your free GraphQL authorized API !
