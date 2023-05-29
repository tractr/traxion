import { Project } from 'ts-morph';

import { isEncryptedField, Model } from '@trxn/hapify-core';
import { indent } from '@trxn/hapify-devkit';

export function generateModuleOptionsSourceFile(
  project: Project,
  models: Model[],
  path: string,
) {
  const fileName = `models-services.module-options.ts`;
  const filePath = `${path}/${fileName}`;

  const sourceFile = project.createSourceFile(filePath);

  sourceFile.addImportDeclarations([
    {
      moduleSpecifier: `./services`,
      namedImports: [{ name: `EncryptionService` }],
    },
  ]);

  const hasEncryptedFields = models.some((model) =>
    model.fields.some(isEncryptedField),
  );

  sourceFile.addTypeAlias({
    isExported: true,
    name: `ModelsServicesModuleOptions`,
    type: `{
      ${hasEncryptedFields ? `encryptionService?: EncryptionService;` : ''}
    }`,
    docs: [
      indent`Models Services Module Options

      This interface is used to define the options of the module.`,
    ],
  });
}
