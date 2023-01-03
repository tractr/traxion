/* eslint-disable @typescript-eslint/no-misused-promises */
import * as fs from 'fs';
import * as path from 'path';

import {
  DMMF,
  generatorHandler,
  GeneratorOptions,
} from '@prisma/generator-helper';
import { logger } from '@prisma/sdk';

import { version } from '../../package.json';

const genEnum = ({ name, values }: DMMF.DatamodelEnum) => {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const enumValues = values.map(({ name }) => `${name}="${name}"`).join(',\n');

  return `enum ${name} { \n${enumValues}\n }`;
};

const writeFileSafely = async (writeLocation: string, content: any) => {
  fs.mkdirSync(path.dirname(writeLocation), {
    recursive: true,
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  fs.writeFileSync(writeLocation, content);
};

generatorHandler({
  onManifest() {
    logger.info(`Registered`);
    return {
      version,
      defaultOutput: '../generated',
      prettyName: 'TEST',
    };
  },
  onGenerate: async (options: GeneratorOptions) => {
    options.dmmf.datamodel.enums.forEach(async (enumInfo) => {
      const tsEnum = genEnum(enumInfo);

      const writeLocation = path.join(
        options.generator.output!.value,
        `${enumInfo.name}.ts`,
      );

      await writeFileSafely(writeLocation, tsEnum);
    });
  },
});
