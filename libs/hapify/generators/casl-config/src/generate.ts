/* eslint-disable @typescript-eslint/no-misused-promises */
import { Project } from 'ts-morph';

import { Schema } from '@trxn/hapify-core';
import { generateTypesSourceFile } from './generators/default-types/types.generator';
import { generateUserOwnershipSourceFile } from './generators/user-ownership/userOwnershipGenerator';
import { generateHelpersSourceFile } from './generators/helpers/helpers.generators';

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

  generateTypesSourceFile(project, output);
  generateUserOwnershipSourceFile(project, output);
  generateHelpersSourceFile(project, output);

  // Generate services, constants and providers
  dataModel.models.forEach((model) => {});


  // generate route index.ts for exports
  // generateDirectoryIndexExporter(project, output);
  // generateFileIndexExporter(project, `${output}`);

  // for each directory, generate index.ts for export

  // generateFileIndexExporter(project, `${output}/constants`);
  // generateFileIndexExporter(project, `${output}/providers`);
}
