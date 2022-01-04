import { join } from 'path';

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

  // check if input path folder exists
  if (!tree.exists(join(projectRoot, options.inputHapifyGeneratedPath))) {
    throw new Error(
      `The folder "${join(
        projectRoot,
        options.inputHapifyGeneratedPath,
      )}" does not exist`,
    );
  }

  // check if output path folder exists
  if (!tree.exists(join(projectRoot, options.outputGeneratedPath))) {
    throw new Error(
      `The folder "${join(
        projectRoot,
        options.outputGeneratedPath,
      )}" does not exist`,
    );
  }

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

  project.targets = project.targets || {};
  project.targets.generate = {
    executor: `${SCHEMATICS_TRACTR_PACKAGE_NAME}:generate`,
    options: {
      cwd: normalizedOptions.projectRoot,
      inputHapifyGeneratedPath: normalizedOptions.inputHapifyGeneratedPath,
      outputGeneratedPath: normalizedOptions.outputGeneratedPath,
      format: normalizedOptions.format,
      cleanFirst: normalizedOptions.cleanFirst,
    },
  };

  // Update the project configuration with the release target
  updateProjectConfiguration(tree, normalizedOptions.projectName, project);

  await formatFiles(tree);
}
