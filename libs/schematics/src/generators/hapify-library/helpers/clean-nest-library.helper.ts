import { join } from 'path';

import { Tree, updateJson } from '@nrwl/devkit';

import { createSrcIndexTs } from './create-src-index.helper';
import { readTargetConfiguration } from '../../../helpers/read-target-configuration';
import { updateTargetConfiguration } from '../../../helpers/update-target-configuration';
import { NormalizedOptions } from '../schema';

export function cleanNestLibrary(tree: Tree, options: NormalizedOptions) {
  const { projectName, projectRoot, secondaryEntrypoints } = options;
  const nestjsLibraryPath = join(projectRoot, 'src', 'lib');

  tree.delete(nestjsLibraryPath);
  createSrcIndexTs(tree, options);

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

  const build = readTargetConfiguration(tree, projectName, 'build');
  updateTargetConfiguration(tree, projectName, 'build', {
    ...build,
    options: {
      ...build.options,
      assets: [
        ...new Set([
          ...build.options.assets,
          ...secondaryEntrypoints.map(
            (entrypoint) => `${projectRoot}/${entrypoint}.*`,
          ),
        ]),
      ],
    },
  });

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
