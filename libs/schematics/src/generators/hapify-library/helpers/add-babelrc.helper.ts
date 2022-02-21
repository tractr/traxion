import { join } from 'path';

import { Tree } from '@nrwl/devkit';

import { NormalizedOptions } from '../schema';

export function addBabelRc(tree: Tree, options: NormalizedOptions) {
  const { projectRoot } = options;

  tree.write(
    join(projectRoot, '.babelrc'),
    JSON.stringify(
      {
        plugins: [],
        presets: [
          [
            '@nrwl/react/babel',
            {
              runtime: 'automatic',
              useBuiltIns: 'usage',
            },
          ],
        ],
      },
      null,
      2,
    ),
  );
}
