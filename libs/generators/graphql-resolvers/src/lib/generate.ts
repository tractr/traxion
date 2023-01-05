/* eslint-disable @typescript-eslint/no-misused-promises */
import * as fs from 'fs';
import * as path from 'path';

import { generatorHandler, GeneratorOptions } from '@prisma/generator-helper';
import { Project } from 'ts-morph';

import { generateControllerSourceFile } from './generators/controller.generator';
import { generateCreateDtoSourceFile } from './generators/dto.generator';

export function generate() {
  generatorHandler({
    onManifest() {
      return {
        defaultOutput: '../generated',
        prettyName: 'Prisma graphql resolversTEST',
      };
    },
    onGenerate: async (options: GeneratorOptions) => {
      const { generator, dmmf } = options;
      const outputDirectory = generator.output?.value || '../generated';

      const { generatedDirectory, tsConfigFilePath } = generator.config;
      const absoluteTsConfigFilePath = path.resolve(
        outputDirectory,
        tsConfigFilePath,
      );
      const absoluteGeneratedDirectory = path.resolve(
        outputDirectory,
        'src',
        generatedDirectory,
      );

      // Instantiate the ts project
      const project = new Project({
        tsConfigFilePath: absoluteTsConfigFilePath,
        skipAddingFilesFromTsConfig: false,
      });

      // Remove generation directory
      project.getDirectory(absoluteGeneratedDirectory)?.deleteImmediatelySync();

      // Generate controllers and dtos
      dmmf.datamodel.models.forEach((model) => {
        const entityPath = `${absoluteGeneratedDirectory}/${model.name}`;
        generateControllerSourceFile(project, model, entityPath);
        generateCreateDtoSourceFile(project, model, entityPath);
      });

      // Remove unused imports
      project
        .getSourceFiles()
        .map((sourceFile) => sourceFile.fixUnusedIdentifiers());

      // Save project to file system
      project.saveSync();
    },
  });
}
