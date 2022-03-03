import {
  getWorkspaceLayout,
  readWorkspaceConfiguration,
  Tree,
  updateJson,
  updateWorkspaceConfiguration,
} from '@nrwl/devkit';

import { addPackageToPackageJson } from '../../helpers';
import { addFiles, addNpmrc } from './helpers';
import { InitWorkspaceGeneratorSchema } from './schema';

export default async function initWorkspaceGenerator(
  tree: Tree,
  options: InitWorkspaceGeneratorSchema = {},
) {
  addNpmrc(tree);

  const workspaceConfiguration = readWorkspaceConfiguration(tree);

  updateWorkspaceConfiguration(tree, {
    ...workspaceConfiguration,
    workspaceLayout: {
      appsDir: 'apps',
      libsDir: 'libs',
    },
  });

  addFiles(tree);

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

  const { libsDir } = getWorkspaceLayout(tree);
  if (libsDir !== 'packages') tree.delete('packages');

  await addPackageToPackageJson(tree, '@hapify/cli');

  if (tree.exists('tailwind.config.js')) tree.delete('tailwind.config.js');

  const { skipInstall } = options;
}
