import {
  formatFiles,
  names,
  readProjectConfiguration,
  Tree,
  updateProjectConfiguration,
} from '@nrwl/devkit';

import { addLatestSemverToPackageJson } from '../../helpers';
import { ReleaseGeneratorSchema } from './schema';

export const SEMVER_PACKAGE_NAME = '@jscutlery/semver';

interface NormalizedSchema extends ReleaseGeneratorSchema {
  projectName: string;
  projectRoot: string;
}

export function normalizeOptions(
  tree: Tree,
  options: ReleaseGeneratorSchema,
): NormalizedSchema {
  const projectName = names(options.project).fileName;
  const projectConfiguration = readProjectConfiguration(tree, projectName);
  const projectRoot = projectConfiguration.root;

  return {
    ...options,
    projectName,
    projectRoot,
  };
}

export default async function releaseGenerator(
  tree: Tree,
  options: ReleaseGeneratorSchema,
) {
  const normalizedOptions = normalizeOptions(tree, options);

  // Get the project configuration
  const project = readProjectConfiguration(tree, normalizedOptions.projectName);

  project.targets = project.targets || {};
  project.targets.release = {
    executor: `${SEMVER_PACKAGE_NAME}:version`,
    options: {
      syncVersions: false,
    },
  };

  // Update the project configuration with the release target
  updateProjectConfiguration(tree, normalizedOptions.projectName, project);

  await formatFiles(tree);

  return addLatestSemverToPackageJson(tree, SEMVER_PACKAGE_NAME);
}
