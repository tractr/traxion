import { join } from 'path';

import { generateFiles, Tree } from '@nrwl/devkit';

import { NormalizedOptions } from '../schema';

export function addFiles(tree: Tree, options: NormalizedOptions) {
  const substitutions = {
    ...options,
    template: '',
    name: options.name,
    templates: options.template,
    hapifyModelJson: options.hapifyModelsJsonRelativePath,
    hapifyImportReplacements: options.hapifyImportReplacements,
    hapifyUseImportReplacements: options.hapifyUseImportReplacements,
    npmScope: options.npmScope,
  };

  generateFiles(
    tree,
    join(__dirname, '..', 'files', 'library'),
    options.projectRoot,
    substitutions,
  );
}
