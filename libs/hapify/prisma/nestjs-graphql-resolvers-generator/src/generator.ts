import { join } from 'path';

import { generatorHandler } from '@prisma/generator-helper';
import { logger } from '@prisma/internals';
import { Project } from 'ts-morph';

import { version } from '../package.json';

import {
  createSchema,
  discoverOwnership,
  ModelWithOwnership,
} from '@trxn/hapify-core';
import {
  convertDmmfToHapifySchemaDeclaration,
  getUserModelFromSchema,
} from '@trxn/hapify-devkit';
import { generate as generateNestjsResolvers } from '@trxn/hapify-generator-graphql-resolvers';

export const GENERATOR_NAME = 'Hapify Prisma NestJs/GraphqlResolvers';

export type GraphqlResolverGeneratorConfig = {
  outputDirectory: string;
  tsConfigFilePath: string;
  generatedDirectory: string;
};

function printOwnerships(model: ModelWithOwnership) {
  model.ownedModels.forEach((ownedModel) => {
    console.info(`${model.name} owns ${ownedModel.own.name}`);
    printOwnerships(ownedModel.own);
  });
}

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
      const output = generator.output?.value;
      const {
        tsConfigFilePath,
        nestjsServicesImportPath,
        nestjsGraphqlDtosImportPath,
      } = generator.config;

      // Validate the generator configuration
      if (!output) {
        const error = `${GENERATOR_NAME}: No output directory specified in generator block`;
        logger.error(error);
        throw new Error(error);
      }

      if (!tsConfigFilePath) {
        const error = `${GENERATOR_NAME}: No tsConfigFilePath specified in generator block`;
        logger.error(error);
        throw new Error(error);
      }

      // Build the required absolute paths
      const absoluteTsConfigFilePath = join(output, tsConfigFilePath);

      // Instantiate the ts project
      const project = new Project({
        tsConfigFilePath: absoluteTsConfigFilePath,
      });

      // Clear generation directory
      await project.getDirectory(output)?.clearImmediately();

      try {
        const schema = createSchema(convertDmmfToHapifySchemaDeclaration(dmmf));

        const userSchema = schema.models.find((model) => model.name === 'User');
        if (!userSchema) {
          throw new Error('User model not found');
        }
        const getModelsWithOwnerships = discoverOwnership(userSchema, schema);

        printOwnerships(getModelsWithOwnerships);

        const userModel = getUserModelFromSchema(schema);

        console.log(userModel.name);

        // Create the graphql resolvers
        generateNestjsResolvers(project, schema, {
          output,
          importPaths: {
            nestjsServices: nestjsServicesImportPath,
            graphqlDtos: nestjsGraphqlDtosImportPath,
          },
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
}
