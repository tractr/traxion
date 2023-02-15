import * as path from 'path';

import { formatFiles, generateFiles, Tree } from '@nrwl/devkit';

import { PrettierGeneratorSchema } from './schema';
import * as packageJson from '../../../package.json';
import {
  addPackageToPackageJson,
  installPackagesTask,
  npmRun,
  PackageDefinition,
} from '../../helpers';

export const packagesToAdd: PackageDefinition[] = [
  {
    packageName: '@trxn/prettier-config',
    version: packageJson.version,
  },
  { packageName: 'prettier-plugin-packagejson' },
  { packageName: 'prettier-plugin-sort-json' },
];

interface NormalizedSchema extends PrettierGeneratorSchema {
  workspaceRoot: string;
}

function normalizeOptions(
  tree: Tree,
  options: PrettierGeneratorSchema,
): NormalizedSchema {
  return {
    ...options,
    workspaceRoot: '.',
  };
}

export default async function prettierGenerator(
  tree: Tree,
  options: PrettierGeneratorSchema,
) {
  const normalizedOptions = normalizeOptions(tree, options);

  const templateOptions = {
    tmpl: '',
  };

  if (tree.exists('.prettierrc')) tree.delete('.prettierrc');

  generateFiles(
    tree,
    path.join(__dirname, 'files'),
    normalizedOptions.workspaceRoot,
    templateOptions,
  );

  await addPackageToPackageJson(tree, packagesToAdd);

  installPackagesTask(tree, options);

  await formatFiles(tree);

  if (normalizedOptions.format) {
    await npmRun('format');
  }
}
