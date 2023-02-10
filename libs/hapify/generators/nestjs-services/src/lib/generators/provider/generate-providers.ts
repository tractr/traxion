import { names } from '@nrwl/devkit';
import { Project, VariableDeclarationKind } from 'ts-morph';

import { Model, pascal, snake } from '@trxn/hapify-core';
import { generateImports } from './imports.generator';
import { addIndex } from '../../utils/add-index';

export function generateProvidersSourceFile(
  project: Project,
  model: Model,
  path: string,
) {
  const fileName = `${snake(model.name)}-model.providers.ts`;
  const filePath = `${path}/${fileName}`;

  const sourceFile = project.createSourceFile(filePath);
  const name = `${model.name.toUpperCase()}_SERVICES_PROVIDERS`;

  const imports = generateImports(model);
  sourceFile.addImportDeclarations(imports);
  
  sourceFile.addVariableStatement({
    isExported: true,
    declarationKind: VariableDeclarationKind.Const,
    declarations: [
      {
        name,
        type: 'Provider[]',
        initializer: `[
          {
            provide: ${model.name.toUpperCase()}_SERVICE,
            useClass: ${pascal(model.name)}Service,
          }
        ]`,
      },
    ],
  });

  // generate index.ts
  const indexFile = `./${snake(model.name)}-model.providers`;
  const indexFilePath = `${path}/index.ts`;
  addIndex(project, indexFile, indexFilePath);
}
