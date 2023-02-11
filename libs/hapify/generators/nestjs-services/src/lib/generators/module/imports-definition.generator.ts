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
      moduleSpecifier: `./interfaces`,
      namedImports: [{ name: `ModelsServicesOptions` }],
    },
  ];
}
