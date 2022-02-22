import { Tree } from '@nrwl/devkit';

import * as packageJson from '../../../../package.json';
import { addPackageToPackageJson } from '../../../helpers';
import { DEFAULT_DEPENDENCIES } from '../../../schematics.constants';
import { NormalizedOptions } from '../schema';

export async function addTemplateDependencies(
  tree: Tree,
  options: NormalizedOptions,
) {
  const { hapifyTemplates } = options;
  const currentPackageVersion = packageJson.version;

  await addPackageToPackageJson(
    tree,
    hapifyTemplates
      .flatMap((template) => DEFAULT_DEPENDENCIES[template] || [])
      .map((packageDefinition) => {
        if (typeof packageDefinition === 'string') return packageDefinition;

        const { version } = packageDefinition;
        return {
          ...packageDefinition,
          version:
            version && version === 'current' ? currentPackageVersion : version,
        };
      }),
  );
}
