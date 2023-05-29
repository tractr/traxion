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
      moduleSpecifier: `./authorized-services.module-definition`,
      namedImports: [{ name: `ConfigurableModuleClass` }],
    },
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: `./authorized-services.providers`,
      namedImports: [{ name: `AUTHORIZED_SERVICES_PROVIDERS` }],
    },
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: `./services`,
      namedImports: [
        { name: `DEFAULT_OWNERSHIP_SELECT` },
        { name: `DefaultOwnershipSelectProvider` },
      ],
    },
  ];
}
