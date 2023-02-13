/* eslint-disable @typescript-eslint/no-misused-promises */
import * as path from 'path';

import { Project } from 'ts-morph';

import { generateServiceSourceFile } from './generators/service/service.generator';

import { Project as Models } from '@trxn/hapify-core';

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

  const entityPath = `${absoluteGeneratedDirectory}/services`;
  // Generate controllers and dtos
  dataModel.models.forEach((model) => {
    generateServiceSourceFile(project, model, entityPath);
  });

  // Save project to file system
  project.saveSync();
}
