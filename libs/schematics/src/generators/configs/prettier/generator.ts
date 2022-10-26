import * as path from 'path';

import {
  addDependenciesToPackageJson,
  formatFiles,
  generateFiles,
  Tree,
} from '@nrwl/devkit';

import { installPackagesTask, npmRun } from '../../../helpers';
import { traxionVersion } from '../../../versions.constants';
import { PrettierGeneratorSchema } from './schema';

export const packagesToAdd = {
  '@tractr/prettier-config': traxionVersion,
  'prettier-plugin-packagejson': 'latest',
  'prettier-plugin-sort-json': 'latest',
};

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

  addDependenciesToPackageJson(tree, {}, packagesToAdd);

  installPackagesTask(tree, options);

  await formatFiles(tree);

  if (normalizedOptions.format) {
    await npmRun('format');
  }
}
