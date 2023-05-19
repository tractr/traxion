import { join } from 'path';

import { generate as prismaNestjsGraphqlGenerate } from '@floross/temp-prisma-nestjs-graphql/generate';
import { generatorHandler } from '@prisma/generator-helper';
import { logger } from '@prisma/internals';
import { Project } from 'ts-morph';

import { version } from '../package.json';

import { createSchema, Schema } from '@trxn/hapify-core';
import { convertDmmfToHapifySchemaDeclaration } from '@trxn/hapify-devkit';
import { generate } from '@trxn/hapify-generator-nestjs-graphql-dtos';

export const GENERATOR_NAME =
  'Hapify Prisma NestJs/Dtos (unlight/prisma-nestjs-graphql package)';

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

    const { tsConfigFilePath, ...config } = generator.config;

    // Validate the generator configuration
    if (!output) {
      const error = `${GENERATOR_NAME}: No output directory specified in generator block`;
      logger.error(error);
      throw new Error(error);
    }

    // Validate the generator configuration
    if (!output) {
      const error = `${GENERATOR_NAME}: No output directory specified in generator block`;
      logger.error(error);
      throw new Error(error);
    }
    if (!tsConfigFilePath) {
      const error = `${GENERATOR_NAME}: No tsConfigFilePath specified in generator block`;
      logger.warn(error);
      throw new Error(error);
    }

    try {
      const schema: Schema = createSchema(
        convertDmmfToHapifySchemaDeclaration(dmmf),
      );

      await prismaNestjsGraphqlGenerate({
        ...options,
        generator: {
          ...options.generator,
          config: {
            purgeOutput: 'true',
            reExport: 'Single',
            noAtomicOperations: 'true',
            useInputType_StringFilter_ALL: 'string',
            ...config,
          },
        },
      });

      // Instantiate the ts project
      const project = new Project({
        tsConfigFilePath: join(output, tsConfigFilePath),
      });

      const directory = project.getDirectoryOrThrow(output);

      generate(directory, schema);

      // Remove unused imports
      project
        .getSourceFiles()
        .map((sourceFile) => sourceFile.fixUnusedIdentifiers());

      // Save project to file system
      project.saveSync();
    } catch (error) {
      logger.error(error);
      throw error;
    }
  },
});
