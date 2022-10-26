import { join } from 'path';

import { Tree } from '@nrwl/devkit';

import { NormalizedOptions } from '../schema';
import { createSrcIndexTs } from './create-src-index.helper';

export function initializeSrcLibrary(tree: Tree, options: NormalizedOptions) {
  const { projectRoot } = options;

  const nestjsLibraryPath = join(projectRoot, 'src', 'lib');

  tree.delete(nestjsLibraryPath);
  createSrcIndexTs(tree, options);
}
