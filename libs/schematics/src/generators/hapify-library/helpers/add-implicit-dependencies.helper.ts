import {
  readProjectConfiguration,
  Tree,
  updateProjectConfiguration,
} from '@nrwl/devkit';

import { DEFAULT_IMPLICIT_DEPENDENCIES } from '../../../schematics.constants';
import { NormalizedOptions } from '../schema';

export function addImplicitDependencies(
  tree: Tree,
  options: NormalizedOptions,
) {
  const { projectName, hapifyTemplate } = options;
  const projectConfiguration = readProjectConfiguration(tree, projectName);

  updateProjectConfiguration(tree, projectName, {
    ...projectConfiguration,
    implicitDependencies: DEFAULT_IMPLICIT_DEPENDENCIES[hapifyTemplate],
  });
}
