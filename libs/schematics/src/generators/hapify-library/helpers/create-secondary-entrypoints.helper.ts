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
    projectDirectory,
    secondaryEntrypoints,
    useSecondaryEndpoint,
  } = options;

  if (!useSecondaryEndpoint) return;

  tree.write(`libs/${projectDirectory}/package.json`, JSON.stringify({}));
  updateJson(tree, `libs/${projectDirectory}/package.json`, (json) => ({
    version: '0.0.1',
    ...json,
    name: importPath,
  }));

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
