import { constant, pascal, snake } from 'case';
import {
  ArrayLiteralExpression,
  ImportDeclarationStructure,
  Project,
  SourceFile,
  StructureKind,
  VariableDeclarationKind,
} from 'ts-morph';

import { generateImports } from './imports.generator';

import { Model } from '@trxn/hapify-core';

export function generateProviderSourceFile(
  project: Project,
  model: Model,
  path: string,
  servicesProviderSourceFile: SourceFile,
) {
  const fileName = `${snake(model.name)}-authorized-service.provider.ts`;
  const filePath = `${path}/providers/${fileName}`;

  const sourceFile = project.createSourceFile(filePath);
  const name = `${constant(model.name)}_AUTHORIZED_SERVICE_PROVIDER`;

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
          ${pascal(model.name)}AuthorizedService,
          {
            provide: ${constant(model.name)}_AUTHORIZED_SERVICE,
            useExisting: ${pascal(model.name)}AuthorizedService,
          },
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
  arrayExpression?.addElement(`...${name}`);
  return sourceFile;
}

export function generateModelsServicesProvidersSourceFile(
  project: Project,
  path: string,
): SourceFile {
  const fileName = `authorized-services.provider.ts`;
  const filePath = `${path}/${fileName}`;

  const sourceFile = project.createSourceFile(filePath);
  const providerServiceImport: ImportDeclarationStructure[] = [
    {
      kind: StructureKind.ImportDeclaration,
      namedImports: ['Provider'],
      moduleSpecifier: `@nestjs/common`,
    },
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: `./providers`,
    },
  ];
  sourceFile.addImportDeclarations(providerServiceImport);

  sourceFile.addVariableStatement({
    isExported: true,
    declarationKind: VariableDeclarationKind.Const,
    declarations: [
      {
        name: 'AUTHORIZED_SERVICES_PROVIDERS',
        type: 'Provider[]',
        initializer: `[]`,
      },
    ],
  });

  return sourceFile;
}
