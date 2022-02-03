import * as path from 'path';

import { generateFiles, Tree } from '@nrwl/devkit';

import { NormalizedSchema } from './normalize-options.helper';

/**
 * Add static files to the generated application
 *
 * @param tree - File tree
 * @param options - Object containing schematics options
 */
export function addFiles(
  tree: Tree,
  options: NormalizedSchema & { applicationRoot: string },
) {
  const templateOptions = {
    ...options,
    template: '',
  };
  generateFiles(
    tree,
    path.join(__dirname, '../files'),
    options.applicationRoot,
    templateOptions,
  );
}
