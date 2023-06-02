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

## Schema example with seed

If you want to test out what is generated with traxion and how traxion handle authentication and ownerships you can try this schema and the seed:

```prisma
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

generator traxion {
  provider         = "traxion-prisma-generator"
  output           = "../src/generated"
  // Path relative to the output directory
  tsConfigFilePath = "../../tsconfig.app.json"
}

model User {
  id       Int    @id @default(autoincrement())
  email    String @unique
  /// @trxn/hidden
  /// @trxn/encrypted
  password String
  /// @trxn/roles
  role    String  @default("user")
  // Profile relation (one-to-one)
  profile Profile?
  // Task relation (one-to-many)
  tasks Task[] @relation("TaskToAuthor")
  // Shared task relation (many-to-many)
  sharedTasks Task[] @relation("TaskToUser")
}

model Profile {
  id        Int     @id @default(autoincrement())
  firstName  String
  lastName  String
  bio       String?
  user      User    @relation(fields: [userId], references: [id])
  userId    Int     @unique
}

model Task {
  id          Int        @id @default(autoincrement())
  title       String
  description String?
  status      String     @default("draft")
  author      User       @relation("TaskToAuthor", fields: [authorId], references: [id])
  authorId    Int
  sharedWith  User[]     @relation("TaskToUser")
}
```

And you can add the `seed.ts` next to your schema file (don't forget to add the seed target inside your package.json file):

```json
{
  "prisma": {
    "schema": "prisma/schema.prisma",
    "seed": "npx ts-node --project tsconfig.json ./prisma/seed.ts"
  }
}
```

Note: you will need to install `@ngneat/falso` as a dev dependency and to add this configuration inside your package.json:

```typescript
import { randFirstName, randLastName, randText } from '@ngneat/falso';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export function createUser({
  email,
  password,
  role,
  sharedTasksWith = [],
}: {
  email: string;
  password: string;
  role: string;
  sharedTasksWith?: string[];
}) {
  console.info(`Creating user ${email}`);
  return prisma.user.create({
    data: {
      email,
      password: bcrypt.hashSync(password, 10),
      role,
      profile: {
        create: {
          firstName: randFirstName(),
          lastName: randLastName(),
          bio: randText(),
        },
      },
      tasks: {
        create: [
          {
            title: `${email}'s task`,
            description: randText(),
            status: 'open',
            ...(sharedTasksWith.length > 0 && {
              sharedWith: {
                connect: sharedTasksWith.map((userEmail) => ({
                  email: userEmail,
                })),
              },
            }),
          },
        ],
      },
    },
  });
}

async function seed() {
  const users = [
    await createUser({
      email: 'admin@traxion.dev',
      password: 'password',
      role: 'admin',
    }),
    await createUser({
      email: 'user1@traxion.dev',
      password: 'password',
      role: 'user',
    }),
    await createUser({
      email: 'user2@traxion.dev',
      password: 'password',
      role: 'user',
      sharedTasksWith: ['user1@traxion.dev'],
    }),
  ];

  console.info(`Seeded ${users.length} users`);
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});

```

## User Authentication

Now you can start your GraphQL API, log in and make a request on the users:

To login you can use this method:

```graphql
mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    accessToken
    user {
      id
      email
      profile {
        firstName
        lastName
        bio
      }
    }
  }
}
```

With this as query variables:

```json
{"email": "admin@traxion.dev", "password": "password"}
```

You should get a jwt accessToken with the user information.

Set the Http Header of you playground with this:

```json
{
  "Authorization": "Bearer <accessToken>"
}
```

Now you are fully authenticated, you can access to the users information:

```graphql
query findAllUsers {
  findManyUsers {
    users {
      email
      roles
      profile {
        firstName
        lastName
        bio
      }
      tasks {
        id
        description
        author {
          email
        }
        sharedWith {
          email
        }
      }
      sharedTasks {
        id
        description
        author {
          email
        }
        sharedWith {
          email
        }
      }
    }
  }
}
```

Well done ! You are now fully configured to update your schema and start generating with prisma your Graphql API.
