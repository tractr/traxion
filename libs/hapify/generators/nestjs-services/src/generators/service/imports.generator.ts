import { constant, kebab, pascal } from 'case';
import { ImportDeclarationStructure, StructureKind } from 'ts-morph';

import { isEncryptedField, Model } from '@trxn/hapify-core';

export function generateImports(model: Model): ImportDeclarationStructure[] {
  const imports: ImportDeclarationStructure[] = [
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: `@nestjs/common`,
      namedImports: [{ name: 'Injectable' }, { name: 'Inject' }],
    },
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: `@prisma/client`,
      namedImports: [{ name: 'Prisma' }, { name: pascal(model.name) }],
    },
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: `@trxn/nestjs-database`,
      namedImports: [
        { name: 'PrismaService' },
        { name: 'excludePrismaField' },
        { name: 'GetPrismaKeyIfNotSelected' },
      ],
    },
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: `./${kebab(model.name)}-default.service`,
      namedImports: [{ name: `${pascal(model.name)}DefaultService` }],
    },
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: `../constants`,
      namedImports: [{ name: `${constant(model.name)}_DEFAULT_SERVICE` }],
    },
  ];

  const hasEncryptedFields = model.fields.filter(isEncryptedField).length > 0;

  if (hasEncryptedFields) {
    imports.push({
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: `./encryption.service`,
      namedImports: [{ name: `EncryptionService` }],
    });
  }

  return imports;
}
