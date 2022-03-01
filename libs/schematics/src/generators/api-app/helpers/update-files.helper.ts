import { join } from 'path';

import { generateFiles, Tree } from '@nrwl/devkit';

import { NormalizedOptions } from '../schema';

export function updateFiles(tree: Tree, normalizedOptions: NormalizedOptions) {
  const { appsDir, name } = normalizedOptions;
  const apiPath = join(appsDir, name);
  const appPath = join(apiPath, 'src', 'app');

  // delete some files
  tree.delete(join(appPath, 'app.controller.ts'));
  tree.delete(join(appPath, 'app.controller.spec.ts'));
  tree.delete(join(appPath, 'app.service.ts'));
  tree.delete(join(appPath, 'app.service.spec.ts'));

  // Generate the api files
  generateFiles(
    tree,
    join(__dirname, '..', 'files'),
    join(appsDir, name),
    normalizedOptions,
  );
}
