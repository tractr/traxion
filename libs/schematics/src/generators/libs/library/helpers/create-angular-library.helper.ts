import {
  libraryGenerator,
  librarySecondaryEntryPointGenerator,
} from '@nrwl/angular/generators';
import { Tree } from '@nrwl/devkit';

import { NormalizedOptions } from '../schema';
import { createSrcIndexTs } from './create-src-index.helper';
import { initializeSrcLibrary } from './initialize-src-library.helper';

/**
 * Create angular library to host a traxion based lib
 * @param tree
 * @param options
 */
export async function createAngularLibrary(
  tree: Tree,
  options: NormalizedOptions,
) {
  const { name, directory, extra, importPath } = options;
  const libraryGeneratorOptions = { name, directory, importPath, ...extra };

  // Generate the angular library
  await libraryGenerator(tree, libraryGeneratorOptions);

  // Remove the extras lib folder and create an empty index.ts file
  initializeSrcLibrary(tree, options);

  // Creating the secondary entrypoints if needed
  const { secondaryEntrypoints, useSecondaryEndpoint } = options;

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
