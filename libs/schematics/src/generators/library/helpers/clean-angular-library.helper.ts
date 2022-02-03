import { join } from 'path';

import { Tree } from '@nrwl/devkit';

import { NormalizedOptions } from '../schema';
import { createSrcIndexTs } from './create-src-index.helper';

export function cleanAngularLibrary(tree: Tree, options: NormalizedOptions) {
  const { projectRoot } = options;
  const angularLibraryPath = join(projectRoot, 'src', 'lib');

  tree.delete(angularLibraryPath);
  createSrcIndexTs(tree, options);
}
