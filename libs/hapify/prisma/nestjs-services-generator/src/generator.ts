import * as path from 'path';

import { generatorHandler } from '@prisma/generator-helper';
import { logger } from '@prisma/sdk';
import { Project } from 'ts-morph';

import { version } from '../package.json';

import { createSchema, Schema } from '@trxn/hapify-core';
import { convertDmmfToHapifySchemaDeclaration } from '@trxn/hapify-devkit';
import { hapifyNestjsServicesGenerator } from '@trxn/hapify-generators-nestjs-services';

export const GENERATOR_NAME = 'Hapify Prisma NestJs/Services';

generatorHandler({
  onManifest() {
    return {
      version,
      prettyName: GENERATOR_NAME,
    };
  },
  onGenerate: async (options) => {
    const { generator, dmmf } = options;

    const outputDirectory = generator.output?.value;

    if (!outputDirectory) {
      const error = `${GENERATOR_NAME}: No output directory specified in generator block`;
      logger.error(error);
      throw new Error(error);
    }

    // Get the configuration from the generator block
    const { tsConfigFilePath, generatedDirectory } = generator.config;

    // Build the required absolute paths
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

    try {
      logger.log(`Convert DMMF to Hapify schema declaration`);
      const schema: Schema = createSchema(
        convertDmmfToHapifySchemaDeclaration(dmmf),
      );

      // TODO: Create the nestjs services
      hapifyNestjsServicesGenerator(project, schema, {
        generatedDirectory: absoluteGeneratedDirectory,
      });
    } catch (error) {
      logger.error(error);
      throw error;
    }

    // Remove unused imports
    project
      .getSourceFiles()
      .map((sourceFile) => sourceFile.fixUnusedIdentifiers());

    // Save project to file system
    project.saveSync();
  },
});
