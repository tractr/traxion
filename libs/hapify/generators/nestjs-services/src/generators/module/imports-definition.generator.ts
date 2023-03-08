import { ImportDeclarationStructure, StructureKind } from 'ts-morph';

import {} from '@trxn/nestjs-database';

export function generateImportsDefinition(): ImportDeclarationStructure[] {
  return [
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: `@nestjs/common`,
      namedImports: [
        { name: `ConfigurableModuleBuilder` },
        { name: `DynamicModule` },
        { name: `ForwardReference` },
        { name: `Provider` },
        { name: `Type` },
      ],
    },
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: `./interfaces`,
      namedImports: [{ name: `ModelsServiceModuleOptions` }],
    },
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: `@trxn/nestjs-core`,
      namedImports: [
        { name: `addImportsAndProvidersExtra` },
        { name: `addProviderWithInjectionTokenExtra` },
        { name: `ImportsExtra` },
        { name: `ProvidersExtra` },
        { name: `ProviderWithInjectionToken` },
      ],
    },
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: `@trxn/nestjs-database`,
      namedImports: [{ name: `PRISMA_SERVICE` }, { name: `PrismaService` }],
    },
  ];
}
