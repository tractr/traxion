import { join } from 'path';

import { getWorkspaceLayout, Tree } from '@nrwl/devkit';
import { prompt } from 'enquirer';
import { v4 as uuid4 } from 'uuid';

import { getImportPrefixPath } from '../../../helpers';
import {
  AvailableTraxionTemplates,
  DEFAULT_LIBRARY_DESCRIPTIONS,
  DEFAULT_LIBRARY_NAMES,
} from '../../../schematics.constants';
import { NormalizedOptions, TraxionWorkspaceGeneratorSchema } from '../schema';

export async function normalizeOptions(
  tree: Tree,
  options: TraxionWorkspaceGeneratorSchema,
): Promise<NormalizedOptions> {
  const { libsDir, appsDir, npmScope } = getWorkspaceLayout(tree);

  const { useAllLibraries } = options;

  let librariesToInstall: AvailableTraxionTemplates[] = DEFAULT_LIBRARY_NAMES;

  // If the developer do not want all libraries we ask him which one he wants
  if (!useAllLibraries) {
    librariesToInstall = (
      await prompt<{ libraries: AvailableTraxionTemplates[] }>({
        type: 'multiselect',
        name: 'libraries',
        message: 'Select the libraries you want to install:',
        choices: DEFAULT_LIBRARY_NAMES.map((name) => ({
          name,
          message: DEFAULT_LIBRARY_DESCRIPTIONS[name],
        })),
      })
    ).libraries;
  }

  const packageVersion = (
    await import(join(__dirname, '..', '..', '..', '..', 'package.json'))
  ).version;

  return {
    ...options,
    librariesToInstall,

    packageVersion,
    npmScope,

    appsDir,
    libsDir,

    // adminName: 'admin',
    // apiName: 'api',
    // pwaName: 'pwa',
    // uuid4: uuid4(),
  };
}
