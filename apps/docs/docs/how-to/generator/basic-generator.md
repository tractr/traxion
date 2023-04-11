## Introduction

In this tutorial, we will learn how to generate code for a NestJS application from a Prisma schema using a set of
Node.js libraries. NestJS is a popular Node.js framework that provides a robust platform for building scalable and
modular applications. Prisma, on the other hand, is a modern ORM for Node.js that makes it easy to interact with
databases.

We will be using three libraries - `@trxn/prisma-nestjs-services-generator`, `@trxn/prisma-nestjs-graphql-generator`,
and `prisma-nestjs-graphql` - to generate NestJS services, GraphQL resolvers, DTOs, and schemas based on a Prisma
schema.By the end of this tutorial, you will be able to generate a complete NestJS application with CRUD operations and
a GraphQL API from a Prisma schema with just a few commands.

Let's get started!

## Pre-requisites

Before we begin, make sure you have the following prerequisites installed on your computer:

**Node.js**: You can download the latest version of Node.js from the official website: https://nodejs.org/en/

**NestJS CLI**: Install the NestJS CLI by running the following command in your terminal:

```shell
npm install -g @nestjs/cli
```

**Prisma CLI**: Install the Prisma CLI by running the following command in your terminal:

```shell
npm install prisma --save-dev
```

**Docker**: If you don't have a database installed on your computer, we recommend using Docker to run a PostgreSQL
container. You can download and install Docker from the official website: https://www.docker.com/products/docker-desktop

Make sure you have a basic understanding of Node.js, NestJS, GraphQL, and Prisma before starting this tutorial. We will
be
generating code for a simple application, so it would be helpful if you have a basic understanding of these
technologies.

## Step 1: Create a NestJS application

Let's start by creating a new NestJS project. Run the following command in your terminal to create a new NestJS project

```shell
nest new nestjs-prisma-demo
```

Follow the prompts to create a new project. Once the project is created, navigate to the project directory.

```shell
cd nestjs-prisma-demo
```

## Step 2: Install Prisma in the NestJS project

Next, we will install Prisma in the NestJS project. Run the following command in your terminal to install Prisma:

```shell
npm install prisma --save-dev
```

## Step 3: Initialize Prisma

Next, we will initialize Prisma in the NestJS project. Run the following command in your terminal to initialize Prisma:

```shell
npx prisma init
```

## Step 4: Create a PostgreSQL database

Next, we will create a PostgreSQL database. We will be using Docker to run a PostgreSQL container.
If you already have a PostgreSQL database installed on your computer, you can skip this step.
Run the following command in your terminal to create a PostgreSQL container:

```shell
docker run --name nestjs-prisma-demo -e POSTGRES_PASSWORD=passwd -e POSTGRES_USER=user -e POSTGRES_DB=demo -p 5432:5432 -d postgres
```

You can also create a PostgreSQL database using Docker Compose. Create a `docker-compose.yml` file in the project
directory and add the following configuration:

```yaml
version: '3.1'

services:
  postgres:
    image: postgres
    environment:
      POSTGRES_PASSWORD: passwd
      POSTGRES_USER: user
      POSTGRES_DB: db
    ports:
      - 5432:5432
```

The start the container, run the following command in your terminal:

```shell
docker-compose up -d
```

### Update the environment variables

Next, we will update the environment variables in the `.env` file. Open the `.env` file and update the following

```shell
DATABASE_URL="postgresql://user:passwd@localhost:5432/demo?schema=public"
```

## Step 5: Install the Prisma generator libraries

### Libraries overview

`@trxn/prisma-nestjs-services-generator`: This library generates NestJS services based on a Prisma schema. These
services provide CRUD (Create, Read, Update, Delete) operations for each model in the schema.

`@trxn/prisma-nestjs-graphql-generator`: This library generates GraphQL resolvers based on a Prisma schema. These
resolvers provide GraphQL queries and mutations for each model in the schema.

`prisma-nestjs-graphql`: This library generates NestJS DTOs (Data Transfer Objects) and a GraphQL schema based on a
Prisma schema. These DTOs are used to validate incoming data and ensure consistency in the application. The GraphQL
schema defines the structure of the API and the available queries and mutations.

### Install the libraries

Next, we will install the libraries. Run the following command in your terminal to install the libraries:

```shell
npm install --save-dev @trxn/prisma-nestjs-services-generator @trxn/prisma-nestjs-graphql-resolvers-generator prisma-nestjs-graphql 
```

you will also need to install those dependencies, to use the generated code:

```shell
npm i --save @nestjs/apollo @nestjs/graphql @paljs/plugins @prisma/client @trxn/nestjs-database @trxn/nestjs-graphql prisma
```
## Step 6: Create a Prisma schema

Next, we will create a Prisma schema. Go to the `prisma` directory and open the `schema.prisma` file.

### Add some models

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

### Declare the Prisma generators

Next, we will declare the Prisma generators. Add the following configuration to the `generator` block:

#### `prisma-nestjs-graphql` generator

Add this block to use the `prisma-nestjs-graphql` generator:

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

Add this block to use the `@trxn/prisma-nestjs-services-generator` generator:

```prisma
generator nestjsServices {
  provider = "trxn-prisma-nestjs-services-generator"
  output   = "../src/nestjs-services"
  tsConfigFilePath   = "../../tsconfig.json"
}
```

We need to specify the path to the `tsconfig.json` file. This is required in order to
configure [TSMorph](https://ts-morph.com/).

#### `@trxn/prisma-nestjs-graphql-generator` generator

Add this block to use the `@trxn/prisma-nestjs-graphql-generator` generator:

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

As the previous generator, we need to specify the path to the `tsconfig.json` file.

The `nestjsServicesImportPath` and `nestjsGraphqlDtosImportPath` options specify the relative path from the parent
directory of the path defined in the `output` option to the output directory of the `@trxn/prisma-nestjs-services-generator`
and `prisma-nestjs-graphql` generators respectively.

## Step 7: Generate the NestJS services and DTOs

Now that we have created the Prisma schema, we can generate the NestJS services and DTOs. Run the following command in
your terminal:

```shell
npx prisma generate
```

