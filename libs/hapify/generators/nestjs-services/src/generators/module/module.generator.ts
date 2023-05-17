import { ClassDeclarationStructure, Project, StructureKind } from 'ts-morph';

import { generateImports } from './imports.generator';

import { isEncryptedField, Model } from '@trxn/hapify-core';

export function generateModuleClass(
  models: Model[],
): ClassDeclarationStructure {
  const className = `ModelsServicesModule`;

  const hasEncryptedFields = models.some((model) =>
    model.fields.some(isEncryptedField),
  );

  return {
    kind: StructureKind.Class,
    name: className,
    isExported: true,
    extends: `ConfigurableModuleClass`,
    decorators: [
      {
        name: `Module({
      providers: [...MODELS_SERVICES_PROVIDERS${
        hasEncryptedFields ? ', EncryptionService' : ''
      }],
      exports: [...MODELS_SERVICES_PROVIDERS${
        hasEncryptedFields ? ', EncryptionService' : ''
      }],
    })`,
      },
    ],
  };
}

export function generateModuleSourceFile(
  project: Project,
  models: Model[],
  path: string,
) {
  const fileName = `models-services.module.ts`;
  const filePath = `${path}/${fileName}`;

  const sourceFile = project.createSourceFile(filePath);

  const imports = generateImports(models);
  const moduleClass = generateModuleClass(models);

  sourceFile.addImportDeclarations(imports);
  sourceFile.addClass(moduleClass);
}
