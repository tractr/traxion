import { addDependenciesToPackageJson, Tree, updateJson } from '@nrwl/devkit';
import { pick } from 'lodash';

import { addFiles } from './helpers';
import { InitWorkspaceGeneratorSchema } from './schema';
import { PACKAGES_VERSIONS } from '../../../packages-versions.constant';
import { installPackagesTask } from '../../helpers';

export default async function initWorkspaceGenerator(
  tree: Tree,
  options: InitWorkspaceGeneratorSchema = {},
) {
  addFiles(tree);

  updateJson(tree, 'package.json', (json) => ({
    ...json,
    scripts: {
      build: 'nx run-many --all --target=build',
      format: 'nx format:write --all',
      generate: 'npx nx run-many --target generate --all',
      lint: 'nx workspace-lint && nx run-many --all --target=lint --parallel',
      nx: 'nx',
      test: ' nx run-many --all --target=test',
      'hpf:serve': 'hpf serve --depth 5',
      ...json.scripts,
    },
  }));

  addDependenciesToPackageJson(
    tree,
    {},
    pick(PACKAGES_VERSIONS, '@hapify/cli'),
  );

  const { skipInstall } = options;
  installPackagesTask(tree, { skipInstall });
}
