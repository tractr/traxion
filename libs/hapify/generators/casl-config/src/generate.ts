/* eslint-disable @typescript-eslint/no-misused-promises */
import { Project } from 'ts-morph';

import { Schema } from '@trxn/hapify-core';

export type NestjsServiceAuthorizedGeneratorConfig = {
  output: string;
  overwrite?: boolean;
};

export function hapifyCaslConfigGenerator(
  project: Project,
  dataModel: Schema,
  config: NestjsServiceAuthorizedGeneratorConfig,
) {
  const { output } = config;

  // Generate module
  // generateModuleSourceFile(project, output);

  // Generate modules definition
  // generateModuleDefinitionSourceFile(project, output);

 
  // Generate services, constants and providers
  dataModel.models.forEach((model) => {

  });
  console.warn(`🚜 ~ file: generate.ts:29 ~ model:`);

  // generate route index.ts for exports
  // generateDirectoryIndexExporter(project, output);
  // generateFileIndexExporter(project, `${output}`);

  // for each directory, generate index.ts for export

  // generateFileIndexExporter(project, `${output}/constants`);
  // generateFileIndexExporter(project, `${output}/providers`);
}