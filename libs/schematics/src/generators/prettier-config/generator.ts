import * as path from 'path';

import {
  addDependenciesToPackageJson,
  formatFiles,
  generateFiles,
  Tree,
} from '@nrwl/devkit';

import * as packageJson from '../../../package.json';
import { addLatestSemverToPackageJsonDevDeps, npmRun } from '../../helpers';
import { PrettierGeneratorSchema } from './schema';

export const packagesToAdd = [
  {
    packageName: '@tractr/prettier-config',
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

  await Promise.all(
    packagesToAdd.map(({ packageName, version }) =>
      version
        ? addDependenciesToPackageJson(tree, {}, { [packageName]: version })
        : addLatestSemverToPackageJsonDevDeps(tree, packageName),
    ),
  );

  await formatFiles(tree);

  if (normalizedOptions.format) {
    await npmRun('format');
  }
}
