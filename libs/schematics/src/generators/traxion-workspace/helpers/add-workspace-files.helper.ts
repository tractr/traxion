import { join } from 'path';

import { generateFiles, Tree, updateJson } from '@nrwl/devkit';

import { addPackageToPackageJson } from '../../..';
import { NormalizedOptions } from '../schema';
import { getTemplatesOptions } from './get-templates-options.helper';

export async function addWorkspaceFiles(
  tree: Tree,
  options: NormalizedOptions,
) {
  const { libsDir } = options;
  // Generate the workspace root files
  generateFiles(
    tree,
    join(__dirname, '..', 'files', 'workspace-root'),
    '',
    getTemplatesOptions(tree, options),
  );

  updateJson(tree, 'package.json', (json) => ({
    ...json,
    scripts: {
      build: 'nx run-many --all --target=build',
      format: 'nx format:write --all',
      generate: 'npx nx run-many --target generate --all',
      postinstall:
        '(is-ci || husky install) && ngcc --properties es2015 browser module main',
      lint: 'nx workspace-lint && nx run-many --all --target=lint --parallel',
      nx: 'nx',
      test: ' nx run-many --all --target=test',
      'hpf:serve': 'hpf serve --depth 5',
      ...json.scripts,
    },
  }));

  if (libsDir !== 'packages') tree.delete('packages');

  await addPackageToPackageJson(tree, '@hapify/cli');
}
