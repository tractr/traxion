import { join } from 'path';

import {
  readProjectConfiguration,
  Tree,
  updateProjectConfiguration,
} from '@nrwl/devkit';

import { NormalizedOptions } from '../schema';

export function addImplicitDependencies(
  tree: Tree,
  options: NormalizedOptions,
) {
  const { directory, projectName, hapifyImportReplacements } = options;
  const projectConfiguration = readProjectConfiguration(tree, projectName);

  updateProjectConfiguration(tree, projectName, {
    ...projectConfiguration,
    implicitDependencies: [
      ...new Set([
        ...hapifyImportReplacements.map(
          (dependency) => `${directory}-${dependency}`,
        ),
        ...(projectConfiguration?.implicitDependencies || []),
      ]),
    ],
  });
}
