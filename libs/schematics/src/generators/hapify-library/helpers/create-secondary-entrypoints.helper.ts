import { librarySecondaryEntryPointGenerator } from '@nrwl/angular/generators';
import { Tree, updateJson } from '@nrwl/devkit';

import { NormalizedOptions } from '../schema';
import { createSrcIndexTs } from './create-src-index.helper';

export async function createSecondaryEntrypoints(
  tree: Tree,
  options: NormalizedOptions,
) {
  const {
    importPath,
    libsDir,
    projectDirectory,
    secondaryEntrypoints,
    useSecondaryEndpoint,
  } = options;

  tree.write(`${libsDir}/${projectDirectory}/package.json`, JSON.stringify({}));
  updateJson(tree, `${libsDir}/${projectDirectory}/package.json`, (json) => ({
    version: '0.0.1',
    ...json,
    name: importPath,
  }));

  if (!useSecondaryEndpoint) return;

  await Promise.all(
    secondaryEntrypoints.map(async (entrypoint) => {
      await librarySecondaryEntryPointGenerator(tree, {
        skipModule: true,
        name: entrypoint,
        library: options.projectName,
      });

      createSrcIndexTs(tree, options, entrypoint);
    }),
  );
}
