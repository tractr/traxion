# hapify-templates-nestjs-graphql

This library host the templates that will be generate to be used with the graphql
server

## How to generate the files

You can register this module inside your hapifyrc file:

```js
module.export = {
  // ...
  extends: ['@tractr/hapify-templates-nestjs-graphql'],
  importReplacements: {
    models: '@tractr/generated-models',
    'nestjs-models-common': '@tractr/generated-nestjs-models-common',
  },
}
```

You can add the generate target to your nx libs that will handle the generation for you

```json
{
  "targets":{
    "generate": {
      "executor": "@tractr/schematics:generate",
      "options": {
        "cwd": "libs/nestjs/graphql"
      }
    }
  }
}
```

You must add a new prisma generator inside your base prisma schema
(`libs/prisma/prisma/schemas/base.schema`) with this minimal configuration:

```prisma
generator nestjsGraphql {
  provider = "prisma-nestjs-graphql"
  output = "../../../nestjs/graphql/src/generated/prisma-nestjs-graphql"
  purgeOutput = true
  reExport = Single
  fields_Validator_from = "class-validator"
  fields_Validator_input = true
}
```

To finalize the installation you can install some extra packages:

```bash
npm i --save-dev prisma-nestjs-graphql @tractr/hapify-templates-nestjs-graphql
```

```bash
npm i --save @nestjs/apollo @nestjs/graphql @paljs/plugins @tractr/nestjs-graphql apollo-server-core apollo-server-express
```

## How to use inside your nestjs app

After the generated files you will be able to use the exported graphql module inside
your application. In your `app.module.ts` you should add this lines:

```ts
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModelsModule } from '@myProject/nestjs-graphql';

@Module({
  imports: [
    GraphQLModelsModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      include: [GraphQLModelsModule],
      autoSchemaFile: 'schema.gql',
      sortSchema: true,
      debug: true,
    }),
    // ...
  ]
  // ...
})
export class AppModule {}
```

> :warning: The class validator will validate for you the input but the graphql args is not fully annoted yet.
To be able to use this library you should remove this class validator options from your `main.ts` file

```json
whitelist: true,
forbidNonWhitelisted: true,
```
