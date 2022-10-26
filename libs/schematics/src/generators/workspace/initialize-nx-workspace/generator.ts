import {
  addDependenciesToPackageJson,
  getWorkspaceLayout,
  readWorkspaceConfiguration,
  Tree,
  updateJson,
  updateWorkspaceConfiguration,
} from '@nrwl/devkit';

import { installPackagesTask } from '../../../helpers/install-packages-task.helper';
import { hapifyCliVersion } from '../../../versions.constants';
import { addFiles, addNpmrc } from './helpers';
import { InitWorkspaceGeneratorSchema } from './schema';

/**
 * This generator is responsible for initializing a workspace for Traxion.
 *
 * It will update the workspace configuration to use the Traxion layout,
 * add files to the workspace, and add the Traxion packages to the workspace.
 *
 * @param tree
 * @param options
 */
export default async function initWorkspaceGenerator(
  tree: Tree,
  {
    appsDir = 'apps',
    libsDir = 'libs',
    skipInstall = false,
  }: InitWorkspaceGeneratorSchema = {},
) {
  // We need to not initialize the workspace if it is already initialized.
  if (tree.isFile('hapify-models.json')) return;

  // DEPRECATED: This will be deprecated after publishing the packages on npmjs.com
  addNpmrc(tree);

  // Read the workspace configuration
  const workspaceConfiguration = readWorkspaceConfiguration(tree);

  const { libsDir: oldWorkspaceLibsDir, appsDir: olsWorkspaceAppsDir } =
    getWorkspaceLayout(tree);

  if (oldWorkspaceLibsDir !== libsDir)
    tree.rename(oldWorkspaceLibsDir, libsDir);
  if (olsWorkspaceAppsDir !== appsDir)
    tree.rename(olsWorkspaceAppsDir, appsDir);

  // Update the workspace configuration with the right libs and apps directories
  updateWorkspaceConfiguration(tree, {
    ...workspaceConfiguration,
    workspaceLayout: {
      appsDir,
      libsDir,
    },
  });

  // Add default env, gitignore and hapify models files
  addFiles(tree);

  // Add traxion utilities to the package.json (keeping the default ones)
  updateJson(tree, 'package.json', (json) => ({
    ...json,
    scripts: {
      build: 'nx run-many --all --target=build',
      format: 'nx format:write --all',
      generate: 'npx nx run-many --target generate --all',
      lint: 'nx workspace-lint && nx run-many --all --target=lint --parallel',
      test: ' nx run-many --all --target=test',
      'hpf:serve': 'hpf serve --depth 5',
      ...json.scripts,
    },
  }));

  // Add hapify cli package
  addDependenciesToPackageJson(tree, {}, { '@hapify/cli': hapifyCliVersion });

  // Install the packages if needed
  installPackagesTask(tree, { skipInstall });
}
