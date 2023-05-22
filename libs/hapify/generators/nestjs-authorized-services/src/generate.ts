/* eslint-disable @typescript-eslint/no-misused-promises */
import { Project } from 'ts-morph';

import { NestjsAuthorizedServicesGeneratorConfig } from './config.type';
import { generateAuthorizedServicesModuleOptionsSourceFile } from './generators/interfaces/authorized-services-module-options.interface.generator';
import { generateInterfacesIndexSourceFile } from './generators/interfaces/index.generator';
import { generateModuleDefinitionSourceFile } from './generators/module/module-definition.generator';
import { generateModuleSourceFile } from './generators/module/module.generator';
import {
  generateModelsServicesProvidersSourceFile,
  generateProviderSourceFile,
} from './generators/provider/providers.generator';
import { generateConstantSourceFile } from './generators/service/constant.generator';
import { generateDefaultOwnershipSelectProviderSourceFile } from './generators/service/default-ownership-select.provider.generator';
import { generateServiceSourceFile } from './generators/service/service.generator';
import {
  generateDirectoryIndexExporter,
  generateFileIndexExporter,
} from './utils/index.generator';

import { Schema } from '@trxn/hapify-core';

export function generate(
  project: Project,
  dataModel: Schema,
  config: NestjsAuthorizedServicesGeneratorConfig,
) {
  const { output, importPaths } = config;

  // Generate module
  generateModuleSourceFile(project, output);

  // Generate modules definition
  generateModuleDefinitionSourceFile(project, output);

  // Generate models-services.providers.ts
  const providersSourceFile = generateModelsServicesProvidersSourceFile(
    project,
    dataModel.models,
    output,
  );

  // Generate services, constants and providers
  dataModel.models.forEach((model) => {
    generateServiceSourceFile(project, model, output, importPaths);
    generateConstantSourceFile(project, model, `${output}`);
    generateProviderSourceFile(
      project,
      model,
      `${output}`,
      providersSourceFile,
    );
  });

  // generate interfaces
  generateAuthorizedServicesModuleOptionsSourceFile(project, output);
  generateInterfacesIndexSourceFile(project, output);

  // default ownership provider
  generateDefaultOwnershipSelectProviderSourceFile(project, output);

  // for each directory, generate index.ts for export
  generateFileIndexExporter(project, `${output}/services`);
  generateFileIndexExporter(project, `${output}/constants`);
  generateFileIndexExporter(project, `${output}/providers`);

  // generate rooot index.ts for exports
  generateDirectoryIndexExporter(project, output);
  generateFileIndexExporter(project, `${output}`);
}
