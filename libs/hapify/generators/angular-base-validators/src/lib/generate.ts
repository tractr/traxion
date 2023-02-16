/* eslint-disable @typescript-eslint/no-misused-promises */
import * as path from 'path';

import { Project } from 'ts-morph';



import { Field, Model, Project as Models } from '@trxn/hapify-core';
import { generateValidatorClass, generateValidatorSourceFile } from './validators/validator.generator';
import { generateDirectiveSourceFile } from './directives/directive.generator';
import { generateServiceSourceFile } from './services/services.generator';

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

  const entityPath = `${absoluteGeneratedDirectory}/validators`;
  // Generate controllers and dtos
  dataModel.models.forEach((model) => {
    model.fields.forEach(field => {
      generateValidatorSourceFile(project, model,field,absoluteGeneratedDirectory)
      generateDirectiveSourceFile(project, model,field,absoluteGeneratedDirectory)
      generateServiceSourceFile(project, model,field,absoluteGeneratedDirectory)

    });
  });

  
  // generateServiceIndexFile(project,models.map(model =. model.name),entityPath)
  // Save project to file system
  project.saveSync();
}
