import { pascal } from 'case';
import { ImportDeclarationStructure, Project, StructureKind } from 'ts-morph';

import { Model } from '@trxn/hapify-core';

/**
 * generate import { Prisma } from '@prisma/client';
 *
 * @returns
 */
export function generateImports(models: Model[]): ImportDeclarationStructure[] {
  return [
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: `@casl/ability`,
      namedImports: [{ name: `PureAbility` }],
    },
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: `@casl/prisma`,
      namedImports: [{ name: `PrismaQuery` }, { name: `Subjects` }],
    },
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: `@prisma/client`,
      namedImports: models.map((model) => ({ name: pascal(model.name) })),
    },
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: `@trxn/nestjs-casl`,
      namedImports: [{ name: `Action` }],
    },
  ];
}

export function generateAppAbilitySourceFile(
  project: Project,
  models: Model[],
  path: string,
) {
  const fileName = `app-ability.ts`;
  const filePath = `${path}/types/${fileName}`;

  const sourceFile = project.createSourceFile(filePath);

  const imports = generateImports(models);

  sourceFile.addTypeAlias({
    name: 'ModelSubjects',
    isExported: true,
    type: `{
      ${models
        .map((model) => `${pascal(model.name)}: ${pascal(model.name)};`)
        .join('\n')}
  }`,
  });

  sourceFile.addTypeAlias({
    name: 'AppSubjects',
    isExported: true,
    type: `'all' | Subjects<ModelSubjects>;`,
  });

  sourceFile.addTypeAlias({
    name: 'AppAbility',
    isExported: true,
    type: `PureAbility<[Action, AppSubjects], PrismaQuery>;`,
  });

  sourceFile.addImportDeclarations(imports);
}
