import { Tree } from '@nrwl/devkit';
import { libraryGenerator } from '@nrwl/js';

import { NormalizedOptions } from '../schema';
import { createSecondaryEntrypoints } from './create-secondary-entrypoints.helper';
import { initializeSrcLibrary } from './initialize-src-library.helper';
import { updateBuildOptions } from './update-build-secondary-entrypoints-assets.helper';
import { updatePackageJsonSecondaryImports } from './update-package-json-secondary-imports.helper';

export async function cleanTsLibrary(tree: Tree, options: NormalizedOptions) {
  const { name, directory, extra, importPath, projectRoot } = options;
  const libraryGeneratorOptions = { name, directory, importPath, ...extra };

  // Generate the nestjs library
  await libraryGenerator(tree, libraryGeneratorOptions);

  // Remove the extras lib folder and create an empty index.ts file
  initializeSrcLibrary(tree, options);

  // Creating the secondary entrypoints if needed
  const { useSecondaryEndpoint, secondaryEntrypoints } = options;

  if (!useSecondaryEndpoint) return;

  createSecondaryEntrypoints(tree, options);
  updatePackageJsonSecondaryImports(tree, options);
  updateBuildOptions(tree, options, (build) => ({
    ...build,
    assets: [
      ...new Set([
        ...build.options.assets,
        ...secondaryEntrypoints.map(
          (entrypoint) => `${projectRoot}/${entrypoint}.*`,
        ),
      ]),
    ],
  }));
}
