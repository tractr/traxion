import {
  addProjectConfiguration,
  formatFiles,
  names,
  readProjectConfiguration,
  Tree,
  updateProjectConfiguration,
} from '@nrwl/devkit';

import { addPackageToPackageJson } from '../../helpers';
import { ReleaseGeneratorSchema } from './schema';

export const SEMVER_PACKAGE_NAME = '@jscutlery/semver';

interface NormalizedSchema extends ReleaseGeneratorSchema {
  projectName?: string;
  projectRoot?: string;
}

export function normalizeOptions(
  tree: Tree,
  options: ReleaseGeneratorSchema,
): NormalizedSchema {
  if (options.project) {
    const projectName = names(options.project).fileName;
    const projectConfiguration = readProjectConfiguration(tree, projectName);
    const projectRoot = projectConfiguration.root;

    return {
      ...options,
      projectName,
      projectRoot,
    };
  }

  return { ...options };
}

export default async function releaseGenerator(
  tree: Tree,
  options: ReleaseGeneratorSchema,
) {
  const normalizedOptions = normalizeOptions(tree, options);

  if (normalizedOptions.projectName) {
    // Get the project configuration
    const project = readProjectConfiguration(
      tree,
      normalizedOptions.projectName,
    );

    project.targets = project.targets || {};
    project.targets.release = {
      executor: `${SEMVER_PACKAGE_NAME}:version`,
      options: {
        syncVersions: false,
      },
    };

    // Update the project configuration with the release target
    updateProjectConfiguration(tree, normalizedOptions.projectName, project);
  } else {
    let project;

    try {
      project = readProjectConfiguration(tree, 'workspace');
    } catch {
      addProjectConfiguration(tree, 'workspace', { root: '.', targets: {} });
      project = readProjectConfiguration(tree, 'workspace');
    }

    project.targets = {
      ...project.targets,
      release: {
        executor: '@jscutlery/semver:version',
        options: {
          syncVersions: true,
        },
      },
    };

    updateProjectConfiguration(tree, 'workspace', project);
  }

  await formatFiles(tree);

  return addPackageToPackageJson(tree, SEMVER_PACKAGE_NAME);
}
