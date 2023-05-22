import { Project } from 'ts-morph';

export function generateDatabaseModuleSourceFile(
  project: Project,
  path: string,
) {
  const fileName = `database.module.ts`;
  const filePath = `${path}/${fileName}`;

  const sourceFile = project.createSourceFile(filePath);

  sourceFile.addImportDeclarations([
    {
      moduleSpecifier: '@nestjs/common',
      namedImports: ['Module'],
    },
    {
      moduleSpecifier: '@trxn/nestjs-database',
      namedImports: ['DatabaseModule as TrxnDatabaseModule'],
    },
  ]);

  sourceFile.addClass({
    name: 'DatabaseModule',
    isExported: true,
    decorators: [
      {
        name: 'Module',
        arguments: [
          `{
  imports: [TrxnDatabaseModule.register({})],
  exports: [TrxnDatabaseModule],
}
      `,
        ],
      },
    ],
  });
}
