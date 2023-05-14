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

We will be using three libraries - `@trxn/prisma-nestjs-services-generator`
, `@trxn/prisma-nestjs-graphql-resolvers-generator`,
and `prisma-nestjs-graphql` - to generate NestJS services, GraphQL resolvers, DTOs, and schemas based on a Prisma
schema.By the end of this tutorial, you will be able to generate a complete NestJS application with CRUD operations and
a GraphQL API from a Prisma schema with just a few commands.

Let's get started!

## Pre-requisites

Before we begin, make sure you have the following prerequisites installed on your computer:

**Node.js**: You can download the latest version of Node.js from the official website: <https://nodejs.org/en/>

**NestJS CLI**: Install the NestJS CLI by running the following command in your terminal:

```shell
npm install -g @nestjs/cli
```

**Docker**: If you don't have a database installed on your computer, we recommend using Docker to run a PostgreSQL
container. You can download and install Docker from the official website: <https://www.docker.com/products/docker-desktop>

Make sure you have a basic understanding of Node.js, NestJS, GraphQL, and Prisma before starting this tutorial. We will
be
generating code for a simple application, so it would be helpful if you have a basic understanding of these
technologies.

## Step 1: Initialize a NestJS application

To begin, create a new NestJS project by executing the following command in your terminal:

```shell
nest new nestjs-prisma-demo
```

Follow the prompts to set up the new project. Once the project has been created, navigate to its directory:

```shell
cd nestjs-prisma-demo
```

Now that the initial NestJS application is in place, you're ready to move forward with installing Prisma.

## Step 2: Integrate Prisma into the NestJS project

In this step, you'll install Prisma into your NestJS project. Execute the following command in your terminal to add
Prisma as a development dependency:

```shell
npm install prisma --save-dev
```

## Step 3: Set up Prisma

Now it's time to set up Prisma within your NestJS project. To initialize Prisma, execute the following command in your
terminal:

```shell
npx prisma init
```

## Step 4: Set up a PostgreSQL database

In this step, you'll create a PostgreSQL database. We'll use Docker to run a PostgreSQL container. If you already have a
PostgreSQL database installed on your computer, feel free to skip this step.

Execute the following command in your terminal to create a PostgreSQL container:

```shell
docker run --name nestjs-prisma-demo -e POSTGRES_PASSWORD=passwd -e POSTGRES_USER=user -e POSTGRES_DB=demo -p 5432:5432 -d postgres
```

Alternatively, you can create a PostgreSQL database using Docker Compose. Create a `docker-compose.yml` file in your
project directory and add the following configuration:

```yaml
version: '3.1'

services:
  postgres:
    image: postgres
    environment:
      POSTGRES_PASSWORD: passwd
      POSTGRES_USER: user
      POSTGRES_DB: demo
    ports:
      - 5432:5432
```

To start the container, execute the following command in your terminal:

```shell
docker-compose up -d
```

### Configure environment variables

Now, update the environment variables in the `.env` file. Open the `.env` file and modify the following line:

```shell
DATABASE_URL="postgresql://user:passwd@localhost:5432/demo?schema=public"
```

This will be useful when we will start the NestJS application.

## Step 5: Install Prisma generator libraries

### Libraries overview

`@trxn/prisma-nestjs-services-generator`: Generates NestJS services based on a Prisma schema, providing CRUD operations
for each model in the schema.

`@trxn/prisma-nestjs-graphql-resolvers-generator`: Creates GraphQL resolvers based on a Prisma schema, offering GraphQL
queries and mutations for each model in the schema.

`prisma-nestjs-graphql`: Produces NestJS DTOs (Data Transfer Objects) and a GraphQL schema from a Prisma schema,
ensuring validation of incoming data and consistency in the application. The GraphQL schema defines the API structure
and available queries and mutations.

### Install libraries

Now it's time to install the generator libraries. Execute the following command in your terminal to install them:

```shell
npm install --save-dev @trxn/prisma-nestjs-graphql-resolvers-generator @trxn/prisma-nestjs-services-generator prisma-nestjs-graphql
```

Additionally, you'll need to install the following dependencies to utilize the generated code:

```shell
npm install --save @nestjs/apollo @nestjs/graphql @paljs/plugins @prisma/client @trxn/nestjs-database @trxn/nestjs-graphql prisma
```

## Step 6: Define a Prisma schema

In this step, you'll create a Prisma schema. Navigate to the `prisma` directory and open the `schema.prisma` file.

### Add models

Add the following models to the schema:

```prisma
model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  posts     Post[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String
  published Boolean  @default(false)
  author    User     @relation(fields: [authorId], references: [id])
  authorId  Int
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Configure Prisma generators

Next, you'll declare the Prisma generators. Add the following configuration to the `generator` block:

#### `prisma-nestjs-graphql` generator

Add this block to enable the `prisma-nestjs-graphql` generator:

```prisma
// Nestjs graphql dto generator
generator nestjsGraphql {
  provider                      = "prisma-nestjs-graphql"
  output                        = "../src/nestjs-graphql-dtos"
  purgeOutput                   = true
  reExport                      = Single
  noAtomicOperations            = true
  fields_Validator_from         = "class-validator"
  fields_Validator_input        = true
  useInputType_StringFilter_ALL = "string"
}
```

For more information about the `prisma-nestjs-graphql` generator, see
the [prisma-nestjs-graphql](https://www.npmjs.com/package/prisma-nestjs-graphql) documentation.

#### `@trxn/prisma-nestjs-services-generator` generator

Add this block to enable the `@trxn/prisma-nestjs-services-generator` generator:

```prisma
generator nestjsServices {
  provider = "trxn-prisma-nestjs-services-generator"
  output   = "../src/nestjs-services"
  tsConfigFilePath   = "../../tsconfig.json"
}
```

You need to specify the path to the `tsconfig.json` file. This is required to configure [TSMorph](https://ts-morph.com/)
.

#### `@trxn/prisma-nestjs-graphql-resolvers-generator` generator

Add this block to enable the `@trxn/prisma-nestjs-graphql-resolvers-generator` generator:

```prisma
generator graphqlResolvers {
  provider = "trxn-prisma-nestjs-graphql-resolvers-generator"
  output = "../src/nestjs-resolvers"

  // Path relative to the output directory
  tsConfigFilePath   = "../../tsconfig.json"
  nestjsServicesImportPath = "./nestjs-services"
  nestjsGraphqlDtosImportPath = "./nestjs-graphql-dtos"
}
```

Similar to the previous generator, you need to specify the path to the `tsconfig.json` file.

The `nestjsServicesImportPath` and `nestjsGraphqlDtosImportPath` options specify the relative path from the parent
directory of the path defined in the output option to the output directory of
the `@trxn/prisma-nestjs-services-generator` and `prisma-nestjs-graphql` generators, respectively.

## Step 7: Generate NestJS services and DTOs

With the Prisma schema in place, you can now generate NestJS services and DTOs. Execute the following command in your
terminal:

```shell
npx prisma generate
```

## Step 8: Set up the database using Prisma

Proceed to set up the database with Prisma by running the following command in your terminal:

```shell
npx prisma db push
```

### Verify the database using Prisma Studio

Next, verify the database using Prisma Studio. Run the following command in your terminal:

```shell
npx prisma studio
```

You should see the `User` and `Post` tables in the database, both empty at this stage.

## Step 9: Create NestJS modules

### Prisma module

First, create the Prisma module. Navigate to the `src` directory and create a file called `database.module.ts` with the
following content:

```typescript
import {Module} from '@nestjs/common';
import {DatabaseModule} from '@trxn/nestjs-database';

@Module({
    imports: [DatabaseModule.register({})],
    exports: [DatabaseModule],
})
export class PrismaModule {
}
```

### Services module

Next, create the services module. In the `src` directory, create a file called `services.module.ts` with the following
content:

```typescript
import {Module} from '@nestjs/common';
import {PrismaModule} from './database.module';
import {ModelsServicesModules} from "./nestjs-services";

@Module({
    imports: [
        ModelsServicesModules.register({
            imports: [PrismaModule],
        }),
    ],
    exports: [ModelsServicesModules],
})
export class ServicesModule {
}
```

### GraphQL module

Now, create the GraphQL module. In the `src` directory, create a file called `graphql.module.ts` with the following
content:

```typescript
import {ApolloDriver, ApolloDriverConfig} from '@nestjs/apollo';
import {Module} from '@nestjs/common';
import {GraphQLModule as NestjsGraphQLModule} from '@nestjs/graphql';

import {GraphqlModule} from './nestjs-resolvers';
import {ServicesModule} from './services.module';

@Module({
    imports: [
        GraphqlModule.register({
            imports: [ServicesModule],
        }),
        NestjsGraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: 'schema.gql',
            sortSchema: true,
            persistedQueries: false,
        }),
    ],
    exports: [NestjsGraphQLModule, GraphqlModule],
})
export class GraphQLModule {
}
```

### Import GraphQL Module into App Module

Lastly, import the GraphQL module into the App module. Go to the `src` directory and open the `app.module.ts` file.

The `app.module.ts` should look like this:

```typescript
import {Module} from '@nestjs/common';
import {GraphQLModule} from "./graphql.module";

@Module({
    imports: [GraphQLModule],
    controllers: [],
    providers: [],
})
export class AppModule {
}
```

## Step 10: Run the application

With the Prisma schema, NestJS services, and DTOs created, you can now start the application. Execute the following
command in your terminal:

```shell
npm run start:dev
```

Upon running the command, your application will start in development mode. You can now interact with your NestJS
application and test the generated GraphQL API.

## Step 11: Test the application

With the application running, you can now test it. Open your browser and visit the following URL:

```shell
http://localhost:3000/graphql
```

You should see the GraphQL playground. For more information about the GraphQL playground, refer to
the [GraphQL playground](https://www.apollographql.com/docs/apollo-server/v2/testing/graphql-playground/) documentation.

### Create a user

Try creating a user with the following mutation:

```graphql
mutation {
  createUser(data: { email: "user@email.com", name: "User" }) {
    id
    email
    name
  }
}
```

You should receive the created user.

```json
{
  "data": {
    "createUser": {
      "id": "1",
      "email": "user@email.com",
      "name": "User"
    }
  }
}
```

### Create a post related to the user

Try creating a post related to the user with the following mutation:

```graphql
mutation createPost($post: PostCreateInput!) {
  createPost(data: $post) {
    id
    title
    content
    author {
      id
      email
      name
    }
  }
}
```

with the following variables:

```json
{
  "post": {
    "title": "Lorem ipsum",
    "content": "Lorem ipsum dolor sit amet",
    "author": {
      "connect": {
        "id": 1
      }
    }
  }
}
```

You should receive the created post.

```json
{
  "data": {
    "createPost": {
      "id": "2",
      "title": "Lorem ipsum",
      "content": "Lorem ipsum dolor sit amet",
      "author": {
        "id": "1",
        "email": "user@email.com",
        "name": "User"
      }
    }
  }
}
```

### Get users with their posts

Try retrieving users with their posts using the following query:

```graphql
query {
  findManyUsers {
    count
    users {
      id
      email
      name
      posts {
        id
        title
        content
      }
    }
  }
}
```

You should receive the users with their posts.

```json
{
  "data": {
    "findManyUsers": {
      "count": 1,
      "users": [
        {
          "id": "1",
          "email": "user@email.com",
          "name": "User",
          "posts": [
            {
              "id": "1",
              "title": "Lorem ipsum",
              "content": "Lorem ipsum dolor sit amet"
            }
          ]
        }
      ]
    }
  }
}
```

## Step 12: Modify Prisma schema and regenerate NestJS services and DTOs

### Update the Prisma schema

Open the `prisma/schema.prisma` file and modify the `User` model as follows:

```prisma
model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  emailConfirmed Boolean  @default(false)
  posts     Post[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

We've added the `emailConfirmed` field to the `User` model.

### Regenerate NestJS services and DTOs

Next, regenerate the NestJS services and DTOs by running the following command in your terminal:

```shell
npx prisma generate
```

### Migrate the database

Finally, migrate the database by executing the following command in your terminal:

```shell
npx prisma db push
```

With these changes, your application will now include the `emailConfirmed` field in the `User` model, and the generated
services and DTOs will reflect this update.

## Step 13: Test the new schema

Restart the server using the following command:

```shell
npm run start:dev
```

Open your browser and visit the following URL:

```shell
http://localhost:3000/graphql
```

Retrieve the users and the new `emailConfirmed` field with the following query:

```graphql
query {
  findManyUsers {
    count
    users {
      id
      email
      name
      emailConfirmed
      posts {
        id
        title
        content
      }
    }
  }
}
```

You should receive the users with the new `emailConfirmed` field.

```json
{
  "data": {
    "findManyUsers": {
      "count": 1,
      "users": [
        {
          "id": "1",
          "email": "user@email.com",
          "name": "User",
          "emailConfirmed": false,
          "posts": [
            {
              "id": "1",
              "title": "Lorem ipsum",
              "content": "Lorem ipsum dolor sit amet"
            }
          ]
        }
      ]
    }
  }
}
```

## Conclusion

In this tutorial, we've demonstrated how to generate a NestJS application with a GraphQL API from a Prisma schema. We
covered the setup of Prisma, generator libraries, and a PostgreSQL database, as well as defining models, generating
services, DTOs, and GraphQL resolvers.

Our application now has a solid foundation, but there's more to do. In a future tutorial, we will introduce another
generator for implementing authentication and authorization in the NestJS/GraphQL server, adding a crucial security
layer to our application.

Stay tuned for the next tutorial, and good luck with your continued development journey!
