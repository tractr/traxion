import { join } from 'path';

import {
  addDependenciesToPackageJson,
  formatFiles,
  generateFiles,
  getWorkspaceLayout,
  Tree,
} from '@nrwl/devkit';
import { Linter, lintInitGenerator } from '@nrwl/linter';

import { installPackagesTask } from '../../../helpers';
import { traxionVersion } from '../../../versions.constants';
import { EslintGeneratorSchema } from './schema';

export const packagesToAdd = {
  '@tractr/eslint-config': traxionVersion,
  'eslint-config-airbnb-base': 'latest',
  'eslint-config-prettier': 'latest',
  'eslint-import-resolver-alias': 'latest',
  'eslint-import-resolver-typescript': 'latest',
  'eslint-import-resolver-webpack': 'latest',
  'eslint-plugin-cypress': 'latest',
  'eslint-plugin-import': 'latest',
  'eslint-plugin-jest': 'latest',
  'eslint-plugin-json-files': 'latest',
};

export default async function eslintGenerator(
  tree: Tree,
  options: EslintGeneratorSchema = {},
) {
  // First add dependencies to the package json
  addDependenciesToPackageJson(tree, {}, packagesToAdd);
  installPackagesTask(tree, options);

  // Use the lint generator from @nrwl/linter with Eslint
  lintInitGenerator(tree, { linter: Linter.EsLint });

  const { npmScope, libsDir } = getWorkspaceLayout(tree);

  const templateOptions = {
    template: '',
    libsDir,
    npmScope,
  };
  generateFiles(tree, join(__dirname, 'files'), '.', templateOptions);

  await formatFiles(tree);
}
