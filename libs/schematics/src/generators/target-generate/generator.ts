import {
  formatFiles,
  names,
  readProjectConfiguration,
  Tree,
  updateProjectConfiguration,
} from '@nrwl/devkit';

import { TargetGenerateGeneratorSchema } from './schema';

export const SCHEMATICS_TRACTR_PACKAGE_NAME = '@tractr/schematics';

interface NormalizedSchema extends TargetGenerateGeneratorSchema {
  projectName: string;
  projectRoot: string;
}

export async function normalizeOptions(
  tree: Tree,
  options: TargetGenerateGeneratorSchema,
): Promise<NormalizedSchema> {
  if (!options.project) {
    throw new Error(`You must specify a valid project name`);
  }

  const projectName = names(options.project).fileName;
  const projectConfiguration = readProjectConfiguration(tree, projectName);
  const projectRoot = projectConfiguration.root;

  return {
    ...options,
    projectName,
    projectRoot,
  };
}

export default async function targetGenerateGenerator(
  tree: Tree,
  options: TargetGenerateGeneratorSchema,
) {
  const normalizedOptions = await normalizeOptions(tree, options);

  // Get the project configuration
  const project = readProjectConfiguration(tree, normalizedOptions.projectName);

  const baseOptions = {
    cwd: normalizedOptions.projectRoot,
    inputHapifyGeneratedPath: normalizedOptions.inputHapifyGeneratedPath,
    outputGeneratedPath: normalizedOptions.outputGeneratedPath,
  };

  project.targets = project.targets || {};
  project.targets.generate = {
    executor: `${SCHEMATICS_TRACTR_PACKAGE_NAME}:generate`,
    options: {
      ...(!normalizedOptions.format && { format: false }),
      ...(!normalizedOptions.cleanFirst && { cleanFirst: false }),
      ...baseOptions,
    },
  };

  // Update the project configuration with the release target
  updateProjectConfiguration(tree, normalizedOptions.projectName, project);

  await formatFiles(tree);
}
