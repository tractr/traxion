import { Project } from 'ts-morph';

export function generateTraxionModuleSourceFile(
  project: Project,
  outputPath: string,
) {
  const fileName = `traxion.module.ts`;
  const filePath = `${outputPath}/${fileName}`;

  const sourceFile = project.createSourceFile(filePath);

  sourceFile.addImportDeclarations([
    {
      moduleSpecifier: '@nestjs/common',
      namedImports: ['Module'],
    },
    {
      moduleSpecifier: './database.module',
      namedImports: ['DatabaseModule'],
    },
    {
      moduleSpecifier: './authentication.module',
      namedImports: ['AuthenticationModule'],
    },
    {
      moduleSpecifier: './graphql.module',
      namedImports: ['GraphqlModule'],
    },
  ]);

  sourceFile.addClass({
    name: 'TraxionModule',
    isExported: true,
    decorators: [
      {
        name: 'Module',
        arguments: [
          `{
            imports: [GraphqlModule, AuthenticationModule, DatabaseModule],
            exports: [GraphqlModule, AuthenticationModule, DatabaseModule],
          }`,
        ],
      },
    ],
  });
}
