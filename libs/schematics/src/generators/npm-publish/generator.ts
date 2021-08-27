import {
  formatFiles,
  names,
  readProjectConfiguration,
  Tree,
  updateJson,
  updateProjectConfiguration,
} from '@nrwl/devkit';

import { addLatestSemverToPackageJson } from '../../helpers';
import { NpmPublishGeneratorSchema } from './schema';

export const SEMVER_PACKAGE_NAME = 'ngx-deploy-npm';
export const DEFAULT_REGISTRY_URL = 'https://npm.pkg.github.com';
export const DEFAULT_ACCESS_TYPE = 'restricted';

interface NormalizedSchema extends NpmPublishGeneratorSchema {
  projectName: string;
  projectRoot: string;
  repository: string;
  registry: string;
  access: string;
}

export function normalizeOptions(
  tree: Tree,
  options: NpmPublishGeneratorSchema,
): NormalizedSchema {
  const projectName = names(options.project).fileName;
  const projectConfiguration = readProjectConfiguration(tree, projectName);
  const projectRoot = projectConfiguration.root;

  const normalizedOptions: NormalizedSchema = {
    registry: DEFAULT_REGISTRY_URL,
    access: DEFAULT_ACCESS_TYPE,
    ...options,
    projectName,
    projectRoot,
  };

  if (!['public', 'restricted'].includes(normalizedOptions.access))
    throw new Error('access must be equal to public or restricted');

  return normalizedOptions;
}

export default async function npmPublishGenerator(
  tree: Tree,
  options: NpmPublishGeneratorSchema,
) {
  const normalizedOptions = normalizeOptions(tree, options);

  // Get the project configuration
  const project = readProjectConfiguration(tree, normalizedOptions.projectName);

  project.targets = project.targets || {};
  project.targets.publish = {
    executor: `${SEMVER_PACKAGE_NAME}:version`,
    options: {
      access: normalizedOptions.access,
    },
  };

  // Update the project configuration with the release target
  updateProjectConfiguration(tree, normalizedOptions.projectName, project);

  updateJson(tree, `${normalizedOptions.projectRoot}/package.json`, (json) => {
    const toUpdateJson = { ...json };

    toUpdateJson.repository = {
      type: 'git',
      url: normalizedOptions.repository,
    };
    toUpdateJson.publishConfig = {
      access: normalizedOptions.access,
      registry: normalizedOptions.registry,
    };

    return toUpdateJson;
  });

  await formatFiles(tree);

  return addLatestSemverToPackageJson(tree, SEMVER_PACKAGE_NAME);
}
