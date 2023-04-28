/* eslint-disable @typescript-eslint/no-misused-promises */
import { Project } from 'ts-morph';

import { generateModuleDefinitionSourceFile } from './generators/module/module-definition.generator';
import { generateModuleSourceFile } from './generators/module/module.generator';
import {
  generateModelsServicesProvidersSourceFile,
  generateProviderSourceFile,
} from './generators/provider/providers.generator';
import { generateConstantSourceFile } from './generators/service/constant.generator';
import { generateServiceSourceFile } from './generators/service/service.generator';
import {
  generateDirectoryIndexExporter,
  generateFileIndexExporter,
} from './utils/index.generator';

import { Schema } from '@trxn/hapify-core';

export type NestjsServiceAuthorizedGeneratorConfig = {
  output: string;
  overwrite?: boolean;
};

export function hapifyNestjsAuthorizedServicesGenerator(
  project: Project,
  dataModel: Schema,
  config: NestjsServiceAuthorizedGeneratorConfig,
) {
  const { output } = config;

  // Generate module
  // generateModuleSourceFile(project, output);

  // Generate modules definition
  // generateModuleDefinitionSourceFile(project, output);

  // Generate models-services.providers.ts
  const providersSourceFile = generateModelsServicesProvidersSourceFile(
    project,
    output,
  );

  // Generate services, constants and providers
  dataModel.models.forEach((model) => {
    generateServiceSourceFile(project, model, output);
    generateConstantSourceFile(project, model, `${output}`);
    generateProviderSourceFile(
      project,
      model,
      `${output}`,
      providersSourceFile,
    );
  });

  // generate route index.ts for exports
  // generateDirectoryIndexExporter(project, output);
  // generateFileIndexExporter(project, `${output}`);

  // for each directory, generate index.ts for export
  generateFileIndexExporter(project, `${output}/services`);
  // generateFileIndexExporter(project, `${output}/constants`);
  // generateFileIndexExporter(project, `${output}/providers`);
}
