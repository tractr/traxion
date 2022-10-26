import * as path from 'path';
import { join } from 'path';

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

  const gitignore = tree.read('.gitignore')?.toString() || '';

  const assetsPath = join(
    options.projectRoot,
    'src',
    'assets',
    'app-config.json',
  );
  if (!gitignore.includes(assetsPath))
    tree.write(
      '.gitignore',
      `${gitignore}\n\n# Application assets\n${assetsPath}\n`,
    );
}
