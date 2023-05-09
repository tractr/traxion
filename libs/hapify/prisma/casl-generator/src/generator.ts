import { join } from 'path';

import { generatorHandler } from '@prisma/generator-helper';
import { logger } from '@prisma/internals';
import { Project } from 'ts-morph';

import { version } from '../package.json';

import {
  createSchema,
  discoverOwnership,
  getUserModel,
  Schema,
} from '@trxn/hapify-core';
import { convertDmmfToHapifySchemaDeclaration } from '@trxn/hapify-devkit';
import { hapifyCaslConfigGenerator } from '@trxn/hapify-generators-casl-config';

export const GENERATOR_NAME = 'Hapify Prisma NestJs/AuthorizedServices';

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
    const { tsConfigFilePath, userModelName } = generator.config;

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
    const project = new Project({
      tsConfigFilePath: join(output, tsConfigFilePath),
    });

    await project.getDirectory(output)?.clearImmediately();

    try {
      logger.log(`Convert DMMF to Hapify schema declaration`);
      const schema: Schema = createSchema(
        convertDmmfToHapifySchemaDeclaration(dmmf),
      );

      const userModel = getUserModel(schema, userModelName);

      const userWithOwnership = discoverOwnership(userModel, schema);

      hapifyCaslConfigGenerator(project, schema, userWithOwnership, {
        output,
      });
    } catch (error) {
      logger.error(error);
      throw error;
    }

    // Remove unused imports
    // project
    //   .getSourceFiles()
    //   .map((sourceFile) => sourceFile.fixUnusedIdentifiers());

    // Save project to file system
    project.saveSync();
  },
});
