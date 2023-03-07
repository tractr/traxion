/* eslint-disable @typescript-eslint/no-misused-promises */

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
  generatedDirectory: string;
};

export function hapifyNestjsServicesGenerator(
  project: Project,
  dataModel: Schema,
  config: NestjsServiceGeneratorConfig,
) {
  const { generatedDirectory } = config;
  console.log("🚀 ~ file: generate.ts:32 ~ generatedDirectory:", generatedDirectory)


  // Clear generation directory
  // project.getDirectory(generatedDirectory)

  // Generate module
  generateModuleSourceFile(project, generatedDirectory);

  // Generate modules definition
  generateModuleDefinitionSourceFile(project, generatedDirectory);

  // Generate Interface
  generateInterfaceSourceFile(project, `${generatedDirectory}/interfaces`);

  // Generate models-services.providers.ts
  const providersSourceFile = generateModelsServicesProvidersSourceFile(
    project,
    generatedDirectory,
  );

  // Generate services, contants and providers
  dataModel.models.forEach((model) => {
    generateServiceSourceFile(project, model, generatedDirectory);
    generateServiceDefaultSourceFile(project, model, generatedDirectory);
    generateConstantSourceFile(project, model, `${generatedDirectory}`);
    generateProviderSourceFile(
      project,
      model,
      `${generatedDirectory}`,
      providersSourceFile,
    );
  });

  // generate route index.ts for exports
  generateDirectoryIndexExporter(project, generatedDirectory);
  generateFileIndexExporter(project, `${generatedDirectory}`);

  // for each directory, generate index.ts for export
  generateFileIndexExporter(project, `${generatedDirectory}/services`);
  generateFileIndexExporter(project, `${generatedDirectory}/constants`);
  generateFileIndexExporter(project, `${generatedDirectory}/providers`);
  generateFileIndexExporter(project, `${generatedDirectory}/interfaces`);

  // Save project to file system
  // project.saveSync();
}
