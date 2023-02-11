import { names } from '@nrwl/devkit';
import { ArrayLiteralExpression, ImportDeclarationStructure, Project, SourceFile, StructureKind, ts, VariableDeclarationKind } from 'ts-morph';

import { Model, pascal, snake } from '@trxn/hapify-core';
import { generateImports } from './imports.generator';
import { addIndex } from '../../utils/add-index';

export function generateProvidersSourceFile(
  project: Project,
  model: Model,
  path: string,
  servicesProviderSourceFile: SourceFile,
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

  const existingImport = servicesProviderSourceFile.getImportDeclarations().find(declaration => declaration.getModuleSpecifierValue() === "./providers");
  existingImport?.addNamedImport(name);

  const exportedVariable = servicesProviderSourceFile.getVariableStatements().find(variableStatement => variableStatement.getDeclarations()[0].getName() === "MODELS_SERVICES_PROVIDERS");
  const arrayExpression = exportedVariable?.getDeclarations()[0].getInitializer() as ArrayLiteralExpression;
  console.log("🚀 ~ file: generate-providers.ts:45 ~ arrayExpression", arrayExpression)
  arrayExpression.addElement(`...${name}`);


  // const providerServiceImport: ImportDeclarationStructure = {
  //   kind: StructureKind.ImportDeclaration,
  //   moduleSpecifier: `./providers`,

  // }
  // servicesProviderSourceFile.addImportDeclaration(providerServiceImport);

  // generate index.ts
  const indexFile = `./${snake(model.name)}-model.providers`;
  const indexFilePath = `${path}/index.ts`;
  addIndex(project, indexFile, indexFilePath);
}
