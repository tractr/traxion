import { Project, VariableDeclarationKind } from 'ts-morph';

import { generateImportsDefinition } from './imports-definition.generator';

import { Model } from '@trxn/hapify-core';

export function generateModuleDefinitionSourceFile(
  project: Project,
  models: Model[],
  path: string,
) {
  const fileName = `models-services.module-definition.ts`;
  const filePath = `${path}/${fileName}`;

  const sourceFile = project.createSourceFile(filePath);

  const imports = generateImportsDefinition();

  sourceFile.addImportDeclarations(imports);

  sourceFile.addVariableStatement({
    isExported: true,
    declarationKind: VariableDeclarationKind.Const,
    declarations: [
      {
        name: `{
          ConfigurableModuleClass,
          MODULE_OPTIONS_TOKEN,
          ASYNC_OPTIONS_TYPE,
          OPTIONS_TYPE,
        }`,
        initializer: `
new ConfigurableModuleBuilder<ModelsServicesModuleOptions>()
  .setExtras<ImportsExtra>(
    { imports: [] },
    addImportsExtra((definition) => definition),
  )
  .build();
        `,
      },
    ],
  });
}
