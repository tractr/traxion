import { Project } from 'ts-morph';

import { NestjsModulesImportPath } from '../config.types';

import { resolveDynamicPath } from '@trxn/hapify-devkit';

export function generateGraphqlModuleSourceFile(
  project: Project,
  outputPath: string,
  importPaths: NestjsModulesImportPath,
) {
  const fileName = `graphql.module.ts`;
  const filePath = `${outputPath}/${fileName}`;

  const sourceFile = project.createSourceFile(filePath);

  sourceFile.addImportDeclarations([
    {
      moduleSpecifier: '@nestjs/apollo',
      namedImports: ['ApolloDriver, ApolloDriverConfig'],
    },
    {
      moduleSpecifier: '@nestjs/common',
      namedImports: ['Module'],
    },
    {
      moduleSpecifier: '@nestjs/graphql',
      namedImports: ['GraphQLModule as NestjsGraphQLModule'],
    },
    {
      moduleSpecifier: './authorized-services.module',
      namedImports: ['NestjsAuthorizedServicesModule'],
    },
    {
      moduleSpecifier: './database.module',
      namedImports: ['DatabaseModule'],
    },
    {
      moduleSpecifier: resolveDynamicPath(
        importPaths.nestjsGraphqlResolvers,
        '..',
      ),
      namedImports: ['GraphqlModule as GraphqlResolversModule'],
    },
  ]);

  sourceFile.addClass({
    name: 'GraphqlModule',
    isExported: true,
    decorators: [
      {
        name: 'Module',
        arguments: [
          `{
  imports: [
    DatabaseModule,
    NestjsGraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      sortSchema: true,
      debug: true,
      playground: true,
      context: ({ req, res }) => ({ req, res }),
    }),
    GraphqlResolversModule.register({
      imports: [NestjsAuthorizedServicesModule],
    }),
  ],
  exports: [GraphqlModule],
}
      `,
        ],
      },
    ],
  });
}
