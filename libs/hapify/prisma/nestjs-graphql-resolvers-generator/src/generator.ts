import * as fs from 'fs';
import * as path from 'path';
import { inspect } from 'util';

import { generatorHandler } from '@prisma/generator-helper';
import { logger } from '@prisma/sdk';
import { Project } from 'ts-morph';

import { version } from '../package.json';

import { createSchema } from '@trxn/hapify-core';
import { convertDmmfToHapifySchemaDeclaration } from '@trxn/hapify-devkit';
import { generate as generateNestjsResolvers } from '@trxn/hapify-generator-graphql-resolvers';

export const GENERATOR_NAME = 'Hapify Prisma NestJs/GraphqlResolvers';

export type GraphqlResolverGeneratorConfig = {
  outputDirectory: string;
  tsConfigFilePath: string;
  generatedDirectory: string;
};

export function generate() {
  generatorHandler({
    onManifest() {
      return {
        version,
        prettyName: GENERATOR_NAME,
      };
    },
    onGenerate: async (options) => {
      const { generator, dmmf } = options;

      // Extract the generator configuration
      const outputDirectory = generator.output?.value;
      const {
        generatedDirectory,
        tsConfigFilePath,
        nestjsServicesImportPath,
        nestjsGraphqlDtosImportPath,
      } = generator.config;

      // TODO: voir où on gère la validation de la config
      // Validate the generator configuration
      if (!outputDirectory) {
        const error = `${GENERATOR_NAME}: No output directory specified in generator block`;
        logger.error(error);
        throw new Error(error);
      }

      if (!generatedDirectory) {
        const error = `${GENERATOR_NAME}: No generated directory specified in generator block`;
        logger.error(error);
        throw new Error(error);
      }

      if (!tsConfigFilePath) {
        const error = `${GENERATOR_NAME}: No tsConfigFilePath specified in generator block`;
        logger.error(error);
        throw new Error(error);
      }

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
        const schema = createSchema(convertDmmfToHapifySchemaDeclaration(dmmf));

        // Create the graphql resolvers
        generateNestjsResolvers(project, schema, {
          generatedDirectory: absoluteGeneratedDirectory,
          importPaths: {
            nestjsServices: nestjsServicesImportPath,
            graphqlDtos: nestjsGraphqlDtosImportPath,
          },
        });

        // Write the schema to the output directory
        fs.writeFileSync(
          path.join(outputDirectory, 'hapify.json'),
          inspect(schema, true, 10),
        );
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
}
