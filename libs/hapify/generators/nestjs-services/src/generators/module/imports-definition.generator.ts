import { ImportDeclarationStructure, StructureKind } from 'ts-morph';

export function generateImportsDefinition(): ImportDeclarationStructure[] {
  return [
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: `@nestjs/common`,
      namedImports: [{ name: `ConfigurableModuleBuilder` }],
    },
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: `@trxn/nestjs-core`,
      namedImports: [{ name: `addImportsExtra` }, { name: `ImportsExtra` }],
    },
  ];
}
