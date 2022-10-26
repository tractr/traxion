import { join } from 'path';

import { Tree } from '@nrwl/devkit';

import { NormalizedOptions } from '../schema';

export function createSecondaryEntrypoints(
  tree: Tree,
  options: NormalizedOptions,
) {
  const { projectRoot, secondaryEntrypoints, useSecondaryEndpoint } = options;

  if (!useSecondaryEndpoint) return;

  secondaryEntrypoints.forEach((entrypoint) => {
    tree.write(
      join(projectRoot, `${entrypoint}.js`),
      `module.exports = require('./${entrypoint}/src');`,
    );
    tree.write(
      join(projectRoot, `${entrypoint}.d.ts`),
      `export * from './${entrypoint}/src';`,
    );
  });
}
