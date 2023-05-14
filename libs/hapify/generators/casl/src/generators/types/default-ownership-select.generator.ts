import { pascal } from 'case';
import { ImportDeclarationStructure, Project, StructureKind } from 'ts-morph';

import { Model } from '@trxn/hapify-core';

/**
 * generate import { Prisma } from '@prisma/client';
 *
 * @returns
 */
export function generateImports(): ImportDeclarationStructure[] {
  return [
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: `@prisma/client`,
      namedImports: [{ name: `Prisma` }],
    },
  ];
}

export function generateDefaultOwnershipSelectSourceFile(
  project: Project,
  models: Model[],
  path: string,
) {
  const fileName = `default-ownership-select.ts`;
  const filePath = `${path}/types/${fileName}`;

  const sourceFile = project.createSourceFile(filePath);

  const imports = generateImports();

  sourceFile.addTypeAlias({
    name: 'DefaultOwnershipSelect',
    isExported: true,
    type: `{
      ${models
        .map(
          (model) =>
            `${pascal(model.name)}: { [key in keyof Prisma.${pascal(
              model.name,
            )}Select]: boolean },`,
        )
        .join('\n')}
  }`,
  });

  sourceFile.addImportDeclarations(imports);
}
