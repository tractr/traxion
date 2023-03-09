import { ImportDeclarationStructure, StructureKind } from 'ts-morph';

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
      namedImports: [{ name: `PrismaService` }],
    },
  ];
}
