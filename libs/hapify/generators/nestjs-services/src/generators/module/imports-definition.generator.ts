import { ImportDeclarationStructure, StructureKind } from 'ts-morph';

export function generateImportsDefinition(): ImportDeclarationStructure[] {
  const imports: ImportDeclarationStructure[] = [
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
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: `./models-services.module-options`,
      namedImports: [{ name: `ModelsServicesModuleOptions` }],
    },
  ];

  return imports;
}
