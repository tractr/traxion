import { join } from 'path';

import { Tree } from '@nrwl/devkit';

import { DEFAULT_LIBRARY_USE_CONTEXT } from '../../../../schematics.constants';
import { NormalizedOptions } from '../schema';

export function addBabelRc(tree: Tree, options: NormalizedOptions) {
  const { projectRoot, hapifyTemplate } = options;

  if (!DEFAULT_LIBRARY_USE_CONTEXT[hapifyTemplate].includes('react')) return;

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
