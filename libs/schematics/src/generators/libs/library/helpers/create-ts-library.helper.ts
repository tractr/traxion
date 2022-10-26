import { join } from 'path';

import { Tree } from '@nrwl/devkit';
import { libraryGenerator } from '@nrwl/js';

import { NormalizedOptions } from '../schema';
import { createSrcIndexTs } from './create-src-index.helper';

/**
 * Create angular library to host a traxion based lib
 * @param tree
 * @param options
 */
export async function createTsLibrary(tree: Tree, options: NormalizedOptions) {
  const { name, directory, extra, importPath } = options;
  const libraryGeneratorOptions = { name, directory, importPath, ...extra };

  await libraryGenerator(tree, libraryGeneratorOptions);

  const { projectRoot } = options;
  const angularLibraryPath = join(projectRoot, 'src', 'lib');

  tree.delete(angularLibraryPath);
  createSrcIndexTs(tree, options);
}
