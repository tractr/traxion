import { join } from 'path';

import { generateFiles, getWorkspaceLayout, Tree } from '@nrwl/devkit';

export function addFiles(tree: Tree) {
  const { appsDir, libsDir, npmScope } = getWorkspaceLayout(tree);
  const templateOptions = {
    template: '',
    npmScope,
    appsDir,
    libsDir,
  };

  generateFiles(
    tree,
    join(__dirname, '..', 'files', 'root'),
    '',
    templateOptions,
  );
}
