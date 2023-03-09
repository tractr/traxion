import { Project, VariableDeclarationKind } from 'ts-morph';

import { generateImports } from './imports.generator';

export function generateModuleDefinitionSourceFile(
  project: Project,
  path: string,
) {
  const fileName = `graphql.module-definition.ts`;
  const filePath = `${path}/${fileName}`;

  const sourceFile = project.createSourceFile(filePath);

  const imports = generateImports();

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
new ConfigurableModuleBuilder<Record<string, never>>()
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
