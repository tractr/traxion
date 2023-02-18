import { join } from 'path';

import { Tree } from '@nrwl/devkit';

import { createSrcIndexTs } from './create-src-index.helper';
import { NormalizedOptions } from '../schema';

export function cleanAngularLibrary(tree: Tree, options: NormalizedOptions) {
  const { projectRoot } = options;
  const angularLibraryPath = join(projectRoot, 'src', 'lib');

  tree.delete(angularLibraryPath);
  createSrcIndexTs(tree, options);
}
