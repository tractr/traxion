import {
  ArrayLiteralExpression,
  ImportDeclarationStructure,
  Project,
  SourceFile,
  StructureKind,
  VariableDeclarationKind,
} from 'ts-morph';

import { generateImports } from './imports.generator';

import { constant, Model, pascal, snake } from '@trxn/hapify-core';

export function generateProviderSourceFile(
  project: Project,
  model: Model,
  path: string,
  servicesProviderSourceFile: SourceFile,
) {
  const fileName = `${snake(model.name)}-model.providers.ts`;
  const filePath = `${path}/${fileName}`;

  const sourceFile = project.createSourceFile(filePath);
  const name = `${constant(model.name)}_SERVICES_PROVIDERS`;

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
            provide: ${constant(model.name)}_SERVICE,
            useClass: ${pascal(model.name)}Service,
          }
        ]`,
      },
    ],
  });

  const existingImport = servicesProviderSourceFile
    .getImportDeclarations()
    .find(
      (declaration) => declaration.getModuleSpecifierValue() === './providers',
    );
  existingImport?.addNamedImport(name);

  const exportedVariable = servicesProviderSourceFile
    .getVariableStatements()
    .find(
      (variableStatement) =>
        variableStatement.getDeclarations()[0].getName() ===
        'MODELS_SERVICES_PROVIDERS',
    );
  const arrayExpression = exportedVariable
    ?.getDeclarations()[0]
    .getInitializer() as ArrayLiteralExpression;
  arrayExpression.addElement(`...${name}`);
}

export function generateModelsServicesProvidersSourceFile(
  project: Project,
  path: string,
): SourceFile {
  const fileName = `models-services.providers.ts`;
  const filePath = `${path}/${fileName}`;

  const sourceFile = project.createSourceFile(filePath);
  const providerServiceImport: ImportDeclarationStructure = {
    kind: StructureKind.ImportDeclaration,
    moduleSpecifier: `./providers`,
  };
  sourceFile.addImportDeclaration(providerServiceImport);

  sourceFile.addVariableStatement({
    isExported: true,
    declarationKind: VariableDeclarationKind.Const,
    declarations: [
      {
        name: 'MODELS_SERVICES_PROVIDERS',
        type: 'Provider[]',
        initializer: `[]`,
      },
    ],
  });

  return sourceFile;
}
