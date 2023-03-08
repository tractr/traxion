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

    const output = generator.output?.value;

    if (!output) {
      const error = `${GENERATOR_NAME}: No output directory specified in generator block`;
      logger.error(error);
      throw new Error(error);
    }

    // Get the configuration from the generator block
    const { tsConfigFilePath, clearOutput = true } = generator.config;

    // Instantiate the ts project
    const project = new Project({
      tsConfigFilePath,
    });

    if (clearOutput)
      await project.addDirectoryAtPath(output).clearImmediately();

    try {
      logger.log(`Convert DMMF to Hapify schema declaration`);
      const schema: Schema = createSchema(
        convertDmmfToHapifySchemaDeclaration(dmmf),
      );

      hapifyNestjsServicesGenerator(project, schema, {
        output,
      });
    } catch (error) {
      logger.error(error);
      throw error;
    }

    // Remove unused imports
    project
      .getSourceFiles()
      .map((sourceFile) => sourceFile.fixUnusedIdentifiers());
    // TODO: Format the files with prettier

    // Save project to file system
    project.saveSync();
  },
});
