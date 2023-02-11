/* eslint-disable @typescript-eslint/no-misused-promises */
import * as path from 'path';

import { ImportDeclarationStructure, Project, StructureKind, VariableDeclarationKind } from 'ts-morph';

import { generateConstantsSourceFile as generateConstantSourceFile } from './generators/service/generate-constants';
import { generateProvidersSourceFile as generateProviderSourceFile } from './generators/provider/generate-providers';
import { generateServiceIndexFile } from './generators/service/index.generator';
import { generateServiceSourceFile } from './generators/service/service.generator';

import { Project as Models } from '@trxn/hapify-core';
import { generateModuleSourceFile } from './generators/module/generate-module';
import { generateInterfaceSourceFile } from './generators/interface/generate-interface';
import { generateModuleDefinitionSourceFile } from './generators/module/generate-module-definition';
import { generateServicesProvidersFile } from './generators/provider/generate-services-providers';

export type NestjsServiceGeneratorConfig = {
  outputDirectory: string;
  tsConfigFilePath: string;
  generatedDirectory: string;
};

export function generate(
  project: Project,
  dataModel: Models,
  config: NestjsServiceGeneratorConfig,
) {
  const { generatedDirectory, tsConfigFilePath, outputDirectory } = config;
  const absoluteTsConfigFilePath = path.resolve(
    outputDirectory,
    tsConfigFilePath,
  );
  const absoluteGeneratedDirectory = path.resolve(
    outputDirectory,
    generatedDirectory,
  );

  project.addSourceFilesFromTsConfig(absoluteTsConfigFilePath);

  // Clear generation directory
  project.getDirectory(absoluteGeneratedDirectory)?.clear();

  const entityPath = `${absoluteGeneratedDirectory}`;

  // Generate module
  generateModuleSourceFile(project, entityPath);

  // Generate modules definition
  generateModuleDefinitionSourceFile(project, entityPath);

  // Generate Interface
  generateInterfaceSourceFile(project, `${entityPath}/interfaces`);

  const fileName = `models-services.providers.ts`;
  const filePath = `${entityPath}/${fileName}`;

  const sourceFile = project.createSourceFile(filePath);
  const providerServiceImport: ImportDeclarationStructure = {
    kind: StructureKind.ImportDeclaration,
    moduleSpecifier: `./providers`,

  }
  sourceFile.addImportDeclaration(providerServiceImport);

  sourceFile.addVariableStatement({
    isExported: true,
    declarationKind: VariableDeclarationKind.Const,
    declarations: [
      {
        name: "MODELS_SERVICES_PROVIDERS",
        type: 'Provider[]',
        initializer: `[]`,
      },
    ],
    
  });

  // Generate services, contants and providers
  dataModel.models.forEach((model) => {
    generateServiceSourceFile(project, model, `${entityPath}/services`); //TODO: update last variables
    generateConstantSourceFile(project, model, `${entityPath}/constants`);//TODO: update last variables
    generateProviderSourceFile(project, model, `${entityPath}/providers`, sourceFile);//TODO: update last variables
    // generateServicesProvidersFile(sourceFile, model);//TODO: update last variables
  });


  // TODO: change to uppercase
  // TODO: clean code

  // // create models.services.providers.ts
  // const sourceFilePath = `${entityPath}/models.services.providers.ts`;
  // const modelsServicesProvidersFile = project.createSourceFile(sourceFilePath);

  // // const directory = project.getDirectory(`${entityPath}/providers`);
  // const directory = project.getDirectoryOrThrow(`${entityPath}/providers`)

  // directory.forEachFile(filePath => {
  //   const sourceFile = project.getSourceFile(filePath);
  //   sourceFile.getVariableStatements().forEach(variableStatement => {
  //     variableStatement.getDeclarations().forEach(declaration => {
  //       console.log(declaration.getName());
  //     });
  //   });
  // });

  // read every file in providers folder
  // const providers = project.getDirectory(`${entityPath}/providers`)?.






    // Save project to file system
    project.saveSync();
}
