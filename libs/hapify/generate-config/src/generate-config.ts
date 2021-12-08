/* eslint-disable no-await-in-loop */
/* eslint-disable no-continue */

import { join } from 'path';

import debugFactory from 'debug';
import { copy, writeJSON } from 'fs-extra';

import { getHapifyConfig } from '@tractr/hapify-common';

const debug = debugFactory('hpf-generate-config');

function formatTemplatePath(templatePath: string, extension: string): string {
  return `${templatePath}.${extension}`.replace(/[{}]/g, '__');
}

export async function getHapifyOptions(
  currentDirectory: string = process.cwd(),
): Promise<void> {
  debug('Start generate hapify configuration file');
  const hapifyConfig = await getHapifyConfig(currentDirectory);
  if (!hapifyConfig)
    throw new Error(`No hapify config found in ${currentDirectory} folder`);

  // At this point hapify should take the lead
  // Workaround that let hapify still run
  // First workaround cp all the files into `hapify`

  if (hapifyConfig.templates) {
    const promises: Promise<void>[] = [];
    hapifyConfig.templates.forEach((template) => {
      promises.push(
        copy(
          formatTemplatePath(template.inputPath || '', template.engine),
          formatTemplatePath(
            `${join(currentDirectory || '', 'hapify', template.path)}`,
            template.engine,
          ),
        ),
      );
    });
    await Promise.all(promises);
  }

  delete hapifyConfig.extends;
  hapifyConfig.templates = hapifyConfig.templates.map((template) => {
    const toSave = { ...template };
    delete toSave.inputPath;
    delete toSave.outputPath;
    return toSave;
  });

  const writeFile = join(currentDirectory || '', 'hapify.json');
  await writeJSON(writeFile, hapifyConfig, {
    spaces: 2,
  });

  debug(`Generated file: ${writeFile}`);
}
