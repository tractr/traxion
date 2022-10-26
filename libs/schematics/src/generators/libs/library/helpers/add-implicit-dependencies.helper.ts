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
        ...Object.keys(hapifyImportReplacements)
          .filter((template) => template !== 'mock')
          .map(
            (dependency) => `${directory ? `${directory}-` : ''}${dependency}`,
          ),
        ...(projectConfiguration?.implicitDependencies || []),
      ]),
    ],
  });
}
