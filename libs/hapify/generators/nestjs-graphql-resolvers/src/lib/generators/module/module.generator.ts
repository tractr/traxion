import { ClassDeclarationStructure, Project, StructureKind } from 'ts-morph';

import { generateImports } from './imports.generator';
import { generateProvidersVariableStatement } from './variable-statement.generator';

import { Model } from '@trxn/hapify-core';

export function generateModuleClass(): ClassDeclarationStructure {
  const className = `GraphqlModule`;

  return {
    kind: StructureKind.Class,
    name: className,
    isExported: true,
    extends: 'ConfigurableModuleClass',
    decorators: [
      {
        name: 'Module',
        arguments: [`{ providers, exports: providers }`],
      },
    ],
  };
}

export function generateModuleSourceFile(
  project: Project,
  models: Model[],
  path: string,
) {
  const fileName = `graphql.module.ts`;
  const filePath = `${path}/${fileName}`;

  const sourceFile = project.createSourceFile(filePath);

  const moduleClass = generateModuleClass();
  const imports = generateImports(models);
  const providersVariableStatement = generateProvidersVariableStatement(models);

  sourceFile.addImportDeclarations(imports);
  sourceFile.addVariableStatement(providersVariableStatement);
  sourceFile.addClass(moduleClass);
}
