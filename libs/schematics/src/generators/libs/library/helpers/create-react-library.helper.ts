import { join } from 'path';

import { addDependenciesToPackageJson, Tree, updateJson } from '@nrwl/devkit';
import { Linter } from '@nrwl/linter';
import { libraryGenerator } from '@nrwl/react';

import { NormalizedOptions } from '../schema';
import { createSecondaryEntrypoints } from './create-secondary-entrypoints.helper';
import { initializeSrcLibrary } from './initialize-src-library.helper';
import { updateBuildOptions } from './update-build-secondary-entrypoints-assets.helper';
import { updatePackageJsonSecondaryImports } from './update-package-json-secondary-imports.helper';

export async function createReactLibrary(
  tree: Tree,
  options: NormalizedOptions,
) {
  const { name, directory, extra, importPath } = options;
  const libraryGeneratorOptions = { name, directory, importPath, ...extra };

  // Generate the react library
  await libraryGenerator(tree, {
    style: 'none',
    skipTsConfig: false,
    skipFormat: false,
    unitTestRunner: 'jest',
    linter: Linter.EsLint,
    ...libraryGeneratorOptions,
  });
  const { projectRoot } = options;

  // Remove the extras lib folder and create an empty index.ts file
  initializeSrcLibrary(tree, options);

  updateJson(tree, join(projectRoot, 'tsconfig.json'), (json) => ({
    ...json,
    compilerOptions: {
      ...json.compilerOptions,
      noPropertyAccessFromIndexSignature: false,
    },
  }));

  addDependenciesToPackageJson(
    tree,
    {},
    { 'react-router-dom': 'latest', 'react-router': 'latest' },
  );

  // Creating the secondary entrypoints if needed
  const { useSecondaryEndpoint } = options;

  if (!useSecondaryEndpoint) return;

  createSecondaryEntrypoints(tree, options);
  updatePackageJsonSecondaryImports(tree, options);
  updateBuildOptions(tree, options, (build) => ({
    ...build,
    options: {
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
  }));
}
