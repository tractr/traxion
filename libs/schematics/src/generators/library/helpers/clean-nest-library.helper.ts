import { join } from 'path';

import { Tree, updateJson } from '@nrwl/devkit';

import { NormalizedOptions } from '../schema';
import { createSrcIndexTs } from './create-src-index.helper';

export function cleanNestLibrary(tree: Tree, options: NormalizedOptions) {
  const { projectRoot, secondaryEntrypoints } = options;
  const nestjsLibraryPath = join(projectRoot, 'src', 'lib');

  tree.delete(nestjsLibraryPath);
  createSrcIndexTs(tree, options);

  updateJson(tree, join(projectRoot, 'package.json'), (json) => ({
    ...json,
    exports: {
      '.': {
        import: './src/index.js',
      },
      ...secondaryEntrypoints.reduce(
        (acc, entrypoint) => ({
          ...acc,
          [`./${entrypoint}`]: {
            import: `./${entrypoint}/src/index.js`,
          },
        }),
        {},
      ),
    },
  }));
}
