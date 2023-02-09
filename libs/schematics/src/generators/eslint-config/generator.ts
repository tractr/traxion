import { join } from 'path';

import {
  formatFiles,
  generateFiles,
  getWorkspaceLayout,
  Tree,
} from '@nrwl/devkit';
import { Linter, lintInitGenerator } from '@nrwl/linter';

import { EslintGeneratorSchema } from './schema';
import * as packageJson from '../../../package.json';
import {
  addPackageToPackageJson,
  installPackagesTask,
  PackageDefinition,
} from '../../helpers';

export const packagesToAdd: PackageDefinition[] = [
  {
    packageName: '@trxn/eslint-config',
    version: packageJson.version,
  },
  { packageName: 'eslint-config-airbnb-base' },
  { packageName: 'eslint-config-prettier' },
  { packageName: 'eslint-import-resolver-alias' },
  { packageName: 'eslint-import-resolver-typescript' },
  { packageName: 'eslint-import-resolver-webpack' },
  { packageName: 'eslint-plugin-cypress' },
  { packageName: 'eslint-plugin-import' },
  { packageName: 'eslint-plugin-jest' },
  { packageName: 'eslint-plugin-json-files' },
];

export default async function eslintGenerator(
  tree: Tree,
  options: EslintGeneratorSchema,
) {
  // First add dependencies to the package json
  await addPackageToPackageJson(tree, packagesToAdd);
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
