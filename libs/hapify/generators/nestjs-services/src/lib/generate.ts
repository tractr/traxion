/* eslint-disable @typescript-eslint/no-misused-promises */
import * as path from 'path';

import { Project } from 'ts-morph';

import { generateConstantsSourceFile as generateConstantSourceFile } from './generators/service/generate-constants';
import { generateProvidersSourceFile as generateProviderSourceFile } from './generators/provider/generate-providers';
import { generateServiceIndexFile } from './generators/service/index.generator';
import { generateServiceSourceFile } from './generators/service/service.generator';

import { Project as Models } from '@trxn/hapify-core';
import { generateModuleSourceFile } from './generators/module/generate-module';
import { generateInterfaceSourceFile } from './generators/interface/generate-interface';
import { generateModuleDefinitionSourceFile } from './generators/module/generate-module-definition';

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

  // Generate controllers and dtos
  dataModel.models.forEach((model) => {
    generateServiceSourceFile(project, model, `${entityPath}/services`);
    generateConstantSourceFile(project, model, `${entityPath}/constants`);
    generateProviderSourceFile(project, model, `${entityPath}/providers`);

  });
  generateInterfaceSourceFile(project, `${entityPath}/interfaces`);
  generateModuleSourceFile(project, entityPath); // TODO: add the list of providers
  generateModuleDefinitionSourceFile(project, entityPath);

  // Save project to file system
  project.saveSync();
}
