import { constant, kebab, pascal } from 'case';
import { ImportDeclarationStructure, StructureKind } from 'ts-morph';

import { NestjsAuthorizedServicesImportPathConfig } from '../../config.type';

import { Model } from '@trxn/hapify-core';
import { resolveDynamicPath } from '@trxn/hapify-devkit';

export function generateImports(
  model: Model,
  importPaths: NestjsAuthorizedServicesImportPathConfig,
): ImportDeclarationStructure[] {
  const modelPascal = pascal(model.name);
  const modelConstant = constant(model.name);

  return [
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: `@nestjs/common`,
      namedImports: [
        { name: 'Injectable' },
        { name: 'Inject' },
        { name: 'ForbiddenException' },
      ],
    },
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: `@prisma/client`,
      namedImports: [{ name: 'Prisma' }],
    },
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: `@casl/prisma`,
      namedImports: [{ name: 'accessibleBy' }],
    },
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: `@casl/ability`,
      namedImports: [{ name: 'subject' }],
    },
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: '@trxn/nestjs-database',
      namedImports: [{ name: `PrismaService` }],
    },
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: `@trxn/nestjs-casl`,
      namedImports: [{ name: 'Action' }],
    },
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: resolveDynamicPath(importPaths.nestjsServices, '../..'),
      namedImports: [
        { name: `${modelPascal}Service` },
        { name: `${modelConstant}_SERVICE` },
      ],
    },
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: resolveDynamicPath(importPaths.casl, '../..'),
      namedImports: [{ name: `AppAbility` }],
    },
  ];
}
