import { TargetConfiguration, Tree } from '@nrwl/devkit';

import {
  readTargetConfiguration,
  updateTargetConfiguration,
} from '../../../../helpers';
import { NormalizedOptions } from '../schema';

export function updateBuildOptions(
  tree: Tree,
  options: NormalizedOptions,
  createOptions: (currentOptions: TargetConfiguration) => TargetConfiguration,
) {
  const { projectName, useSecondaryEndpoint } = options;

  if (!useSecondaryEndpoint) return;

  const build = readTargetConfiguration(tree, projectName, 'build');

  if (!build) return;

  updateTargetConfiguration(tree, projectName, 'build', {
    ...build,
    options: createOptions(build),
  });
}
