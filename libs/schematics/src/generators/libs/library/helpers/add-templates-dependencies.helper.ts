import { addDependenciesToPackageJson, Tree } from '@nrwl/devkit';

import { DEFAULT_EXTERNALS_DEPENDENCIES } from '../../../../schematics.constants';
import { traxionVersion } from '../../../../versions.constants';
import { NormalizedOptions } from '../schema';

export function addTemplateDependencies(
  tree: Tree,
  options: NormalizedOptions,
) {
  const { hapifyTemplate } = options;

  const dependencies: Record<string, string> =
    DEFAULT_EXTERNALS_DEPENDENCIES[hapifyTemplate] || {};

  addDependenciesToPackageJson(
    tree,
    {},
    Object.keys(dependencies).reduce<Record<string, string>>(
      (acc, packageName) => {
        acc[packageName] =
          dependencies[packageName] === 'current' ? traxionVersion : 'latest';
        return acc;
      },
      {},
    ),
  );

  addDependenciesToPackageJson(
    tree,
    {},
    {
      '@tractr/hapify-config': 'latest',
    },
  );
}
