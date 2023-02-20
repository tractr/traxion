import * as path from 'path';

import { Project } from 'ts-morph';

import {  generateComponentSourceFile } from './generators/components/component.generator';
import { generateModuleSourceFile } from './generators/module.generators';
import { generateStorySourceFile } from './generators/stories/story.generator';
import { generateTemplateSourceFile } from './generators/templates/template.generator';
import {
  generateDirectoryIndexExporter,
  generateFileIndexExporter,
} from './utils/index.generator';

import { kebab, Project as Models } from '@trxn/hapify-core';

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

  const projectEntity = `${absoluteGeneratedDirectory}/components`;

  // Clear generation directory
  project.getDirectory(absoluteGeneratedDirectory)?.clear();

  // Generate source files for each field of every model: directive, validator, service
  dataModel.models.forEach((model) => {
    model.fields.forEach((field) => {
      if (field.name === 'Id') return;
      // Generate component.ts
      generateComponentSourceFile(project, model, field, projectEntity,projectScope)
      // Generate component.stories.ts
      generateStorySourceFile(project, model, field, projectEntity, projectScope)
      // Generate index.ts for export
      generateFileIndexExporter(project, `${projectEntity}/${kebab(model.name)}-${kebab(field.name)}`);
      // Generate component.html
      generateTemplateSourceFile(project, model, field, projectEntity, projectScope)
    });
  });

  // Generate module
 generateModuleSourceFile(project, absoluteGeneratedDirectory);

  // Generate index.ts for export
  generateDirectoryIndexExporter(project, projectEntity);


  // for each directory, generate index.ts for export
  generateFileIndexExporter(
    project,
    absoluteGeneratedDirectory
  );
  generateDirectoryIndexExporter(
    project,
    absoluteGeneratedDirectory
  );

  // Save project to file system
  project.saveSync();
}
