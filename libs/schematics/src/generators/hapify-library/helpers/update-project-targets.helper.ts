import {
  readProjectConfiguration,
  TargetConfiguration,
  Tree,
  updateProjectConfiguration,
} from '@nrwl/devkit';
import * as deepmerge from 'deepmerge';

import {
  readTargetConfiguration,
  updateTargetConfiguration,
} from '../../../helpers';
import { NormalizedOptions } from '../schema';

export function updateProjectTargets(tree: Tree, options: NormalizedOptions) {
  const { projectName, targets } = options;

  // Update the project targets
  Object.keys(targets)
    .map<[string, Partial<TargetConfiguration> | null]>((target) => [
      target,
      targets[target],
    ])
    .filter(
      (configs): configs is [string, Partial<TargetConfiguration>] =>
        configs[1] !== null,
    )
    .forEach(([target, config]) => {
      const targetConfiguration = readTargetConfiguration(
        tree,
        projectName,
        target,
      );

      updateTargetConfiguration(
        tree,
        projectName,
        target,
        deepmerge(targetConfiguration, config),
      );
    });

  // Remove the unused targets
  Object.keys(targets)
    .map<[string, Partial<TargetConfiguration> | null]>((target) => [
      target,
      targets[target],
    ])
    .filter((configs): configs is [string, null] => configs[1] === null)
    .forEach(([target]) => {
      const targetConfiguration = readProjectConfiguration(tree, projectName);

      if (targetConfiguration.targets)
        delete targetConfiguration.targets[target];

      updateProjectConfiguration(tree, projectName, targetConfiguration);
    });
}
