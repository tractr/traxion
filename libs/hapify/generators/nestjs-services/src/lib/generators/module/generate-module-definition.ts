
import { Project, VariableDeclarationKind } from 'ts-morph';

import { generateImportsDefnition } from './imports-definition.generator';


export function generateModuleDefinitionSourceFile(
  project: Project,
  path: string,
) {
  const fileName = `models-services.module-definition.ts`;
  const filePath = `${path}/${fileName}`;

  const sourceFile = project.createSourceFile(filePath);

  const imports = generateImportsDefnition();


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
        type: 'Provider[]',
        initializer: `new ConfigurableModuleBuilder<ModelsServicesOptions>()
        .setExtras<{
          imports: Array<
            Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference
          >;
          providers?: Provider<any>[] | undefined;
        }>(
          {
            imports: [],
            providers: [],
          },
          (options, extras) => ({
              ...options,
              imports: [...(options.imports || []), ...(extras.imports || [])],
              providers: [...(options.providers || []), ...(extras.providers || [])],
            }),
        )
        .build();`
      },
    ],
  });
}
