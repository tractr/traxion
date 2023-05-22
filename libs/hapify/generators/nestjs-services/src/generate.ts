/* eslint-disable @typescript-eslint/no-misused-promises */

import { Project } from 'ts-morph';

import { generateEncryptionServiceConstantSourceFile } from './generators/constants/constant.generator';
import { generateEncryptionServiceSourceFile } from './generators/encryption-service/encryption-service.generator';
import { generateModuleDefinitionSourceFile } from './generators/module/module-definition.generator';
import { generateModuleOptionsSourceFile } from './generators/module/module-options.generator';
import { generateModuleSourceFile } from './generators/module/module.generator';
import {
  generateModelsServicesProvidersSourceFile,
  generateProviderSourceFile,
} from './generators/provider/providers.generator';
import { generateConstantSourceFile } from './generators/service/constant.generator';
import { generateServiceSourceFile } from './generators/service/service.generator';

import { isEncryptedField, Schema } from '@trxn/hapify-core';
import {
  generateDirectoryIndexExporter,
  generateFileIndexExporter,
} from '@trxn/hapify-devkit';

export type NestjsServiceGeneratorConfig = {
  output: string;
  overwrite?: boolean;
};

export function generate(
  project: Project,
  dataModel: Schema,
  config: NestjsServiceGeneratorConfig,
) {
  const { output } = config;

  // Generate module
  generateModuleSourceFile(project, dataModel.models, output);

  // Generate modules definition
  generateModuleDefinitionSourceFile(project, dataModel.models, output);

  // Generate models-services.providers.ts
  const providersSourceFile = generateModelsServicesProvidersSourceFile(
    project,
    output,
  );

  // Generate services, contants and providers
  dataModel.models.forEach((model) => {
    generateServiceSourceFile(project, model, output);
    // generateServiceDefaultSourceFile(project, model, output);
    generateConstantSourceFile(project, model, `${output}`);
    generateProviderSourceFile(
      project,
      model,
      `${output}`,
      providersSourceFile,
    );
  });

  const hasEncryptedFields = dataModel.models.some(
    (model) => model.fields.filter(isEncryptedField).length > 0,
  );

  if (hasEncryptedFields) {
    generateEncryptionServiceSourceFile(project, output);

    // Generate the constants for the encryption service
    generateEncryptionServiceConstantSourceFile(project, output);
  }

  generateModuleOptionsSourceFile(project, dataModel.models, output);

  // generate route index.ts for exports
  generateDirectoryIndexExporter(project, output);
  generateFileIndexExporter(project, `${output}`);

  // for each directory, generate index.ts for export
  generateFileIndexExporter(project, `${output}/services`);
  generateFileIndexExporter(project, `${output}/constants`);
  generateFileIndexExporter(project, `${output}/providers`);
}
