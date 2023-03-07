/* eslint-disable @typescript-eslint/no-misused-promises */
import * as path from 'path';
import * as fs from 'fs';

import { Project } from 'ts-morph';

import { generateInterfaceSourceFile } from './generators/interface/interface.generator';
import { generateModuleDefinitionSourceFile } from './generators/module/module-definition.generator';
import { generateModuleSourceFile } from './generators/module/module.generator';
import {
  generateModelsServicesProvidersSourceFile,
  generateProviderSourceFile,
} from './generators/provider/providers.generator';
import { generateConstantSourceFile } from './generators/service/constant.generator';
import { generateServiceDefaultSourceFile } from './generators/service/service-defaults.generator';
import { generateServiceSourceFile } from './generators/service/service.generator';
import {
  generateDirectoryIndexExporter,
  generateFileIndexExporter,
} from './utils/index.generator';

import { Schema } from '@trxn/hapify-core';


export type NestjsServiceGeneratorConfig = {
  outputDirectory: string;
  tsConfigFilePath: string;
  generatedDirectory: string;
};

export function hapifyNestjsServicesGenerator(
  project: Project,
  dataModel: Schema,
  config: NestjsServiceGeneratorConfig,
) {
  console.log("🚀 ~ file: generate.ts:36 ~ config:", config)

  
  const { generatedDirectory, tsConfigFilePath, outputDirectory } = config;
  const absoluteTsConfigFilePath = path.resolve(
    '/Users/mickaelmartos/tractr/repo/traxion/libs/generated/nestjs-models-common/',
    'tsconfig.lib.json',
  );
  console.log("🚀 ~ file: generate.ts:44 ~ absoluteTsConfigFilePath:", absoluteTsConfigFilePath)
  const absoluteGeneratedDirectory = path.resolve(
    outputDirectory,
    generatedDirectory,
  );
  console.log("🚀 ~ file: generate.ts:49 ~ absoluteGeneratedDirectory:", absoluteGeneratedDirectory)

  project.addSourceFilesFromTsConfig(absoluteTsConfigFilePath);
  console.log("🚀 ~ file: generate.ts:52 ~ project:")

  // Clear generation directory
  project.getDirectory(absoluteGeneratedDirectory)?.clear();
  console.log("🚀 ~ file: generate.ts:56 ~ project:")

  const entityPath = `${absoluteGeneratedDirectory}`;

  console.log("🚀 ~ file: generate.ts:60 ~ entityPath:", entityPath)
  // Generate module
  generateModuleSourceFile(project, entityPath);

  // Generate modules definition
  generateModuleDefinitionSourceFile(project, entityPath);

  // Generate Interface
  generateInterfaceSourceFile(project, `${entityPath}/interfaces`);

  // Generate models-services.providers.ts
  const providersSourceFile = generateModelsServicesProvidersSourceFile(
    project,
    entityPath,
  );

  // Generate services, contants and providers
  dataModel.models.forEach((model) => {
    generateServiceSourceFile(project, model, entityPath);
    generateServiceDefaultSourceFile(project, model, entityPath);
    generateConstantSourceFile(project, model, `${entityPath}`);
    generateProviderSourceFile(
      project,
      model,
      `${entityPath}`,
      providersSourceFile,
    );
  });

  // generate route index.ts for exports
  generateDirectoryIndexExporter(project, entityPath);
  generateFileIndexExporter(project, `${entityPath}`);

  // for each directory, generate index.ts for export
  generateFileIndexExporter(project, `${entityPath}/services`);
  generateFileIndexExporter(project, `${entityPath}/constants`);
  generateFileIndexExporter(project, `${entityPath}/providers`);
  generateFileIndexExporter(project, `${entityPath}/interfaces`);

  // Save project to file system
  project.saveSync();
}
