import * as path from 'path';

import {
  addDependenciesToPackageJson,
  formatFiles,
  generateFiles,
  Tree,
} from '@nrwl/devkit';

import { npmRun } from '../../helpers';
import { PrettierGeneratorSchema } from './schema';

export const SEMVER_PACKAGE_NAME = '@tractr/prettier-config';

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

export default async function releaseGenerator(
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

  addDependenciesToPackageJson(
    tree,
    {},
    {
      // When @tractr/prettier-config will be open source we could use the addLatestSemverToPackageJson helper
      [SEMVER_PACKAGE_NAME]: '^1.7.0',
    },
  );

  await formatFiles(tree);

  if (normalizedOptions.format) {
    await npmRun('format');
  }
}
