---
id: getting-started
title: Getting started
sidebar_label: Getting started
slug: /
---
## Introduction

In this guide, we will explore how to generate code for a NestJS application from a Prisma schema with the help of Traxion, a collection of Node.js libraries. NestJS, a widely used Node.js framework, offers a robust foundation for building scalable and modular applications, while Prisma is a modern Node.js ORM that simplifies database interactions. Let's dive right in!

## Pre-requisites

This guide assumes that you have a NestJS application with a configured Prisma schema. You can refer to the [nestjs documentation](https://docs.nestjs.com/recipes/prisma#set-up-prisma) for Prisma setup information.

Ensure that your NestJS application with a Prisma schema is correctly linked to your database (SQLite, PostgreSQL, or others), and is able to run `npx prisma generate`.

## Installing Dependencies

Traxion is a Prisma generator that utilizes the data within Prisma to create a fully functional GraphQL API. Let's start by installing the Traxion generator dependency:

```bash
npm i -D @trxn/prisma-traxion-generator
```

The generated code will need certain Node packages to run effectively. Install these packages in your app using the command below:

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

## Configuring the Generator within the Prisma Schema

Add the following lines to your schema:

```prisma
generator traxion {
  provider         = "traxion-prisma-generator"
  // Relative to the schema.prisma file
  output           = "../src/generated"
  // Path relative to the output directory
  tsConfigFilePath = "../../tsconfig.json"
}
```

The `output` directory will contain your generated files. Avoid adding any code here as it will be replaced every time you run Prisma generate.

The `tsConfigFilePath` should point to a valid `tsconfig.json`, which will help configure tsMorph correctly according to your application's TypeScript configuration.

This generator relies on a specific `User` table with certain constraints. This guide doesn't cover user configuration. When using this generator for the first time, use the following minimal `User` model:

```prisma
model User {
  id       Int    @id @default(autoincrement())
  email    String @unique
  /// @trxn/role
  role     String @default("user")
  /// @trxn/hidden
  /// @trxn/encrypted
  password String
}
```

## Generating Your Code

Now that Prisma is fully configured, you can generate your code in the standard Prisma way:

```bash
npx prisma generate
```

Post-generation, you'll find the generated code in the directory specified in your schema.

Please note that Traxion does not handle file formatting. This process is project-specific, so we recommend incorporating a format step in your generation process (e.g., `package.json`):

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

It's also important not to version the generated code and let your CI/CD process handle this step during app deployment.

## Configuring Your NestJS App

Lastly, you can import `TraxionModule` from the generated folder and utilize it in your `app.module.ts`:

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

Now, you're all set! Launch your app and enjoy your fully-featured, authorized GraphQL API.
