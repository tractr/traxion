import { ImportDeclarationStructure, StructureKind } from 'ts-morph';

import { isEncryptedField, Model } from '@trxn/hapify-core';

export function generateImports(models: Model[]): ImportDeclarationStructure[] {
  const imports: ImportDeclarationStructure[] = [
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
      namedImports: [{ name: `MODELS_SERVICES_PROVIDERS` }],
    },
  ];

  const hasEncryptedFields = models.some((model) =>
    model.fields.some(isEncryptedField),
  );

  if (hasEncryptedFields) {
    imports.push({
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: `./services`,
      namedImports: [{ name: `EncryptionService` }],
    });
  }

  return imports;
}
