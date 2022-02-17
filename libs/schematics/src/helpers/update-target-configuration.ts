import {
  readProjectConfiguration,
  TargetConfiguration,
  Tree,
  updateProjectConfiguration,
} from '@nrwl/devkit';

export function updateTargetConfiguration(
  tree: Tree,
  projectName: string,
  targetName: string,
  configuration: TargetConfiguration,
) {
  const project = readProjectConfiguration(tree, projectName);
  const targets = project.targets || {};

  return updateProjectConfiguration(tree, projectName, {
    ...project,
    targets: {
      ...targets,
      [targetName]: configuration,
    },
  });
}
