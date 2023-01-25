import * as fs from 'fs';
import * as path from 'path';
import { inspect } from 'util';

import { generatorHandler } from '@prisma/generator-helper';
import { logger } from '@prisma/sdk';
import { Project } from 'ts-morph';

import { version } from '../package.json';

import { createSchema } from '@trxn/hapify-core';
import { convertDmmfToHapifySchemaDeclaration } from '@trxn/hapify-devkit';

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
    const { tsConfigFilePath } = generator.config;

    // Instantiate the ts project
    const project = new Project({
      tsConfigFilePath,
    });

    // Clear generation directory
    project.getDirectory(outputDirectory)?.clear();

    fs.writeFileSync(
      path.join(outputDirectory, 'dmmf.json'),
      JSON.stringify(dmmf.datamodel, null, 2),
    );

    try {
      logger.log(`Convert DMMF to Hapify schema declaration`);
      const schema = createSchema(convertDmmfToHapifySchemaDeclaration(dmmf));

      // Create the nestjs services
      // await hapifyNestjsServicesGenerator(project, schema, generator.config);

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
    project
      .getSourceFiles()
      .map((sourceFile) => sourceFile.fixUnusedIdentifiers());

    // Save project to file system
    project.saveSync();
  },
});
