import * as path from 'path';

import { Project } from 'ts-morph';

import { generateDirectiveSourceFile } from './directives/directive.generator';
import { generateModuleSourceFile } from './module.generator';
import { generateServiceSourceFile } from './services/services.generator';
import {
  generateDirectoryIndexExporter,
  generateFileIndexExporter,
} from './utils/index.generator';
import { generateValidatorSourceFile } from './validators/validator.generator';

import { Project as Models } from '@trxn/hapify-core';

export type NestjsServiceGeneratorConfig = {
  outputDirectory: string;
  tsConfigFilePath: string;
  generatedDirectory: string;
};

export function generate(
  project: Project,
  dataModel: Models,
  config: NestjsServiceGeneratorConfig, // TODO: add project scope
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

  // Generate controllers and dtos
  dataModel.models.forEach((model) => {
    model.fields.forEach((field) => {
      console.log("🚀 ~ file: generate.ts:64 ~ model.fields.forEach ~ field", field)
      generateValidatorSourceFile(
        project,
        model,
        field,
        absoluteGeneratedDirectory,
      );
      generateDirectiveSourceFile(
        project,
        model,
        field,
        absoluteGeneratedDirectory,
      );
      generateServiceSourceFile(
        project,
        model,
        field,
        absoluteGeneratedDirectory,
      );
    });
  });

  generateDirectoryIndexExporter(project, absoluteGeneratedDirectory);

  // for each directory, generate index.ts for export
  generateFileIndexExporter(
    project,
    `${absoluteGeneratedDirectory}/directives`,
  );
  generateFileIndexExporter(project, `${absoluteGeneratedDirectory}/services`);
  generateFileIndexExporter(
    project,
    `${absoluteGeneratedDirectory}/validators`,
  );

    generateModuleSourceFile(project, absoluteGeneratedDirectory);
    
    // Save project to file system
  project.saveSync();
}
