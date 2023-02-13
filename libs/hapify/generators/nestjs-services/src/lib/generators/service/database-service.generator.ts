import {
  ImportDeclarationStructure,
  Project,
  StructureKind,
  VariableDeclarationKind,
} from 'ts-morph';

import { camel, Model, snake } from '@trxn/hapify-core';

export function generateDatabaseServiceSourceFile(
  project: Project,
  model: Model,
  path: string,
) {
  const fileName = `${snake(model.name)}-database.service`;
  const filePath = `${path}/services/${fileName}.ts`;
  const sourceFile = project.createSourceFile(filePath);

  const imports: ImportDeclarationStructure[] = [
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: `@prisma/client`,
      namedImports: [{ name: `Prisma` }, { name: 'PrismaClient' }],
    },
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: `@trxn/nestjs-database`,
      namedImports: [{ name: `DATABASE_SERVICE` }],
    },
  ];
  sourceFile.addImportDeclarations(imports);

  sourceFile.addTypeAlias({
    name: `${model.name}DatabaseService`,
    type: `Prisma.${model.name}Delegate<undefined>`,
    isExported: true,
  });

  sourceFile.addFunction({
    isExported: true,
    name: `${model.name}DatabaseServiceFactory`,
    parameters: [
      {
        name: 'databaseService',
        type: 'PrismaClient',
      },
    ],
    statements: `return databaseService.${camel(model.name)};`,
    returnType: `Prisma.${model.name}Delegate<undefined>`,
  });

  sourceFile.addVariableStatement({
    isExported: true,
    declarationKind: VariableDeclarationKind.Const,
    declarations: [
      {
        name: `${model.name}DatabaseServiceInject`,
        initializer: `[DATABASE_SERVICE]`,
      },
    ],
  });
}
