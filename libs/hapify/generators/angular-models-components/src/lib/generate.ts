import * as path from 'path';

import { Project } from 'ts-morph';

import {
  generateDirectoryIndexExporter,
  generateFileIndexExporter,
} from './utils/index.generator';

import { Project as Models } from '@trxn/hapify-core';
import { generateModuleSourceFile } from './generators/module.generators';

export type AngularServiceGeneratorConfig = {
  outputDirectory: string;
  tsConfigFilePath: string;
  generatedDirectory: string;
  projectScope: string;
};

export function generate(
  project: Project,
  dataModel: Models,
  config: AngularServiceGeneratorConfig,
) {
  const {
    generatedDirectory,
    tsConfigFilePath,
    outputDirectory,
    projectScope,
  } = config;
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

  // Generate source files for each field of every model: directive, validator, service
  // dataModel.models.forEach((model) => {
  //   model.fields.forEach((field) => {
      
   
  //   });
  // });

  // Generate module
 generateModuleSourceFile(project, absoluteGeneratedDirectory);

  // Generate index.ts for export
  generateDirectoryIndexExporter(project, absoluteGeneratedDirectory);
  generateFileIndexExporter(project, absoluteGeneratedDirectory);

  // for each directory, generate index.ts for export
  // generateFileIndexExporter(
  //   project,
  //   `${absoluteGeneratedDirectory}/directives`,
  // );
  // generateFileIndexExporter(project, `${absoluteGeneratedDirectory}/services`);
  // generateFileIndexExporter(
  //   project,
  //   `${absoluteGeneratedDirectory}/validators`,
  // );

  // Save project to file system
  project.saveSync();
}
