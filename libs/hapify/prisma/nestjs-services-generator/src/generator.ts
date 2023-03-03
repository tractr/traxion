import * as fs from 'fs';
import path = require('path');

import { generatorHandler } from '@prisma/generator-helper';
import { logger } from '@prisma/sdk';
import { Project } from 'ts-morph';

import { version } from '../package.json';

import { convertDmmfToHapifySchema } from '@trxn/hapify-devkit';

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

    // Convert dmmf to Hapify model
    // const schema = convertDmmfToHapifySchema(dmmf);

    console.log(JSON.stringify(dmmf.datamodel, null, 2));

    fs.writeFileSync(
      path.join(outputDirectory, 'dmmf.json'),
      JSON.stringify(dmmf.datamodel, null, 2),
    );

    console.log('here');
    // Generate services
    // hapifyNestjsServicesGenerator(schema);

    // Remove unused imports
    project
      .getSourceFiles()
      .map((sourceFile) => sourceFile.fixUnusedIdentifiers());

    // Save project to file system
    project.saveSync();
  },
});
