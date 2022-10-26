import { join } from 'path';

import { Tree, updateJson } from '@nrwl/devkit';

import { NormalizedOptions } from '../schema';

export function updatePackageJsonSecondaryImports(
  tree: Tree,
  options: NormalizedOptions,
) {
  const { projectRoot, secondaryEntrypoints, useSecondaryEndpoint } = options;

  if (!useSecondaryEndpoint) return;

  updateJson(tree, join(projectRoot, 'package.json'), (json) => ({
    ...json,
    exports: {
      '.': {
        default: './src/index.js',
      },
      ...secondaryEntrypoints.reduce(
        (acc, entrypoint) => ({
          ...acc,
          [`./${entrypoint}`]: {
            default: `./${entrypoint}/src/index.js`,
          },
        }),
        {},
      ),
    },
  }));
}
