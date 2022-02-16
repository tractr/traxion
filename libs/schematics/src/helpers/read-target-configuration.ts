import { readProjectConfiguration, Tree } from '@nrwl/devkit';

export function readTargetConfiguration(
  tree: Tree,
  projectName: string,
  targetName: string,
) {
  const project = readProjectConfiguration(tree, projectName);
  const targets = project.targets || {};
  return targets[targetName];
}
