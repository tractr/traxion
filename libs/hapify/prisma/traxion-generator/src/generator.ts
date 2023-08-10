import { join } from 'path';

import { generatorHandler } from '@prisma/generator-helper';
import { logger } from '@prisma/internals';
import { generate as prismaNestjsGraphqlGenerate } from 'prisma-nestjs-graphql/generate';
import { Project } from 'ts-morph';

import { version } from '../package.json';

import { createSchema, Schema } from '@trxn/hapify-core';
import { convertDmmfToHapifySchemaDeclaration } from '@trxn/hapify-devkit';
import { generate } from '@trxn/hapify-generator-traxion';

export const GENERATOR_NAME = 'Hapify Prisma Traxion';

generatorHandler({
  onManifest() {
    return {
      version,
      prettyName: GENERATOR_NAME,
    };
  },
  onGenerate: async (options) => {
    const { generator, dmmf, datasources } = options;

    const output = generator.output?.value;
    const { tsConfigFilePath, ...config } = generator.config;

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

    // Instantiate the ts project
    let project = new Project({
      tsConfigFilePath: join(output, tsConfigFilePath),
    });

    await project.getDirectory(output)?.clearImmediately();

    try {
      const schema: Schema = createSchema(
        convertDmmfToHapifySchemaDeclaration(dmmf),
      );

      await prismaNestjsGraphqlGenerate({
        ...options,
        generator: {
          ...options.generator,
          output: {
            fromEnvVar: options.generator.output?.fromEnvVar || null,
            value: join(output, 'nestjs-graphql-dtos'),
          },
          config: {
            purgeOutput: 'true',
            reExport: 'Single',
            noAtomicOperations: 'true',
            useInputType_StringFilter_ALL: 'string',
            ...config,
          },
        },
      });

      // After the graphql dtos are generated, we need to re-instantiate the project
      project = new Project({
        tsConfigFilePath: join(output, tsConfigFilePath),
      });

      await generate(project, schema, datasources, {
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

    // Save project to file system
    project.saveSync();
  },
});
