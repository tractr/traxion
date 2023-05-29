import { join } from 'path';

import { generatorHandler } from '@prisma/generator-helper';
import { logger } from '@prisma/internals';
import { Project } from 'ts-morph';

import { version } from '../package.json';

import { createSchema } from '@trxn/hapify-core';
import { convertDmmfToHapifySchemaDeclaration } from '@trxn/hapify-devkit';
import { generate } from '@trxn/hapify-generator-nestjs-modules';

export const GENERATOR_NAME = 'Hapify Prisma NestJs/Modules';

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
    const {
      tsConfigFilePath,
      nestjsAuthorizedServicesImportPath,
      nestjsGraphqlResolversImportPath,
      nestjsServicesImportPath,
      nestjsDtosImportPath,
    } = generator.config;

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

    if (!nestjsAuthorizedServicesImportPath) {
      const error = `${GENERATOR_NAME}: No nestjsAuthorizedServicesImportPath specified in generator block`;
      logger.warn(error);
      throw new Error(error);
    }

    if (!nestjsGraphqlResolversImportPath) {
      const error = `${GENERATOR_NAME}: No nestjsGraphqlResolversImportPath specified in generator block`;
      logger.warn(error);
      throw new Error(error);
    }

    if (!nestjsServicesImportPath) {
      const error = `${GENERATOR_NAME}: No nestjsServicesImportPath specified in generator block`;
      logger.warn(error);
      throw new Error(error);
    }
    if (!nestjsDtosImportPath) {
      const error = `${GENERATOR_NAME}: No nestjsDtosImportPath specified in generator block`;
      logger.warn(error);
      throw new Error(error);
    }

    // Instantiate the ts project
    const project = new Project({
      tsConfigFilePath: join(output, tsConfigFilePath),
    });

    await project.getDirectory(output)?.clearImmediately();

    try {
      const schema = createSchema(convertDmmfToHapifySchemaDeclaration(dmmf));

      generate(project, schema, {
        output,
        importPaths: {
          nestjsAuthorizedServices: nestjsAuthorizedServicesImportPath,
          nestjsGraphqlResolvers: nestjsGraphqlResolversImportPath,
          nestjsServices: nestjsServicesImportPath,
          dtos: nestjsDtosImportPath,
        },
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
