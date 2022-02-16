import { join } from 'path';

import {
  readProjectConfiguration,
  Tree,
  updateJson,
  updateProjectConfiguration,
} from '@nrwl/devkit';

import { NormalizedOptions } from '../schema';
import { createSrcIndexTs } from './create-src-index.helper';

export function cleanReactLibrary(tree: Tree, options: NormalizedOptions) {
  const { projectRoot, secondaryEntrypoints } = options;
  const reactLibraryPath = join(projectRoot, 'src', 'lib');

  tree.delete(reactLibraryPath);
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

  const projectConfiguration = readProjectConfiguration(
    tree,
    options.projectName,
  );

  const build = projectConfiguration.targets?.build;

  updateProjectConfiguration(tree, options.projectName, {
    ...projectConfiguration,
    targets: {
      ...projectConfiguration.targets,
      ...(build && {
        build: {
          ...build,
          options: {
            ...build.options,
            external: [
              ...new Set([
                'react/jsx-runtime',
                'react',
                'react-redux',
                'react-is',
                'react-dom',
                'inflection',
                'rxjs',
                ...build.options.external,
              ]),
            ],
          },
        },
      }),
    },
  });
}
