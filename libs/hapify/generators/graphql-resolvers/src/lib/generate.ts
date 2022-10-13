/* eslint-disable @typescript-eslint/no-misused-promises */
import * as path from 'path';

import { kebab } from 'case';
import { Project } from 'ts-morph';

import { generateControllerSourceFile } from './generators/controller/controller.generator';
import { generateCreateDtoSourceFile } from './generators/dto/dto.generator';

import { Root } from '@tractr/hapify-core';

export function generate(dataModel: Root) {
  const { generator, dmmf } = options;
  const outputDirectory = generator.output?.value || '../generated';

  const { generatedDirectory, tsConfigFilePath } = generator.config;
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

  // Generate controllers and dtos
  datamodel.models.forEach((model) => {
    const entityPath = `${absoluteGeneratedDirectory}/${kebab(model.name)}`;
    generateControllerSourceFile(project, model, entityPath);
    generateCreateDtoSourceFile(project, model, entityPath);
  });

  // Remove unused imports
  project
    .getSourceFiles()
    .map((sourceFile) => sourceFile.fixUnusedIdentifiers());

  // Save project to file system
  project.saveSync();
}
