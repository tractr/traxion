/* eslint-disable @typescript-eslint/no-misused-promises */
import * as path from 'path';

import { Project } from 'ts-morph';

import { generateResolverSourceFile } from './generators/resolver/resolver.generator';

import { Project as Models } from '@trxn/hapify-core';

export type GraphqlResolverGeneratorConfig = {
  outputDirectory: string;
  tsConfigFilePath: string;
  generatedDirectory: string;
};

export function generate(
  dataModel: Models,
  config: GraphqlResolverGeneratorConfig,
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

  // Instantiate the ts project
  const project = new Project({
    tsConfigFilePath: absoluteTsConfigFilePath,
  });

  // Clear generation directory
  project.getDirectory(absoluteGeneratedDirectory)?.clear();

  const entityPath = `${absoluteGeneratedDirectory}/services`;
  // Generate controllers and dtos
  dataModel.models.forEach((model) => {
    generateResolverSourceFile(project, model, entityPath);
  });

  

  // Save project to file system
  project.saveSync();
}


