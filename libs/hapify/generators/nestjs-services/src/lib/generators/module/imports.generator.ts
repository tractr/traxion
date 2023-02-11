import { ImportDeclarationStructure, StructureKind } from 'ts-morph';

export function generateImports(): ImportDeclarationStructure[] {
  return [
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: `@nestjs/common`,
      namedImports: [{ name: `Module` }],
    },
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: `./models-services.module-definition`,
      namedImports: [{ name: `ConfigurableModuleClass` }],
    },
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: `./models-services.providers`,
      namedImports: [{ name:  `MODELS_SERVICES_PROVIDERS`}],
    },
  ];
}
