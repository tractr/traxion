import {
  formatFiles,
  names,
  readProjectConfiguration,
  Tree,
  updateProjectConfiguration,
} from '@nrwl/devkit';
import { readJSON } from 'fs-extra';

import {
  addPackageToPackageJson,
  installPackagesTask,
  PackageDefinition,
  Packages,
} from '../../helpers';
import { TargetGenerateGeneratorSchema } from './schema';

export const SCHEMATICS_TRACTR_PACKAGE_NAME = '@tractr/schematics';

export const SCHEMATICS_PACKAGE_JSON_PATH = `${__dirname}/../../../package.json`;

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

  const {
    outputGeneratedPath,
    inputHapifyGeneratedPath,
    moveGeneratedFiles,
    format,
    cleanFirst,
    updateImportPath,
  } = normalizedOptions;

  const baseOptions = {
    cwd: normalizedOptions.projectRoot,
  };

  // Get the project configuration
  const project = readProjectConfiguration(tree, normalizedOptions.projectName);

  project.targets = project.targets || {};
  project.targets.generate = {
    executor: `${SCHEMATICS_TRACTR_PACKAGE_NAME}:generate`,
    options: {
      ...(outputGeneratedPath && {
        outputGeneratedPath,
      }),
      ...(inputHapifyGeneratedPath && {
        inputHapifyGeneratedPath,
      }),
      ...(moveGeneratedFiles === false && { moveGeneratedFiles: false }),
      ...(updateImportPath === false && { updateImportPath: false }),
      ...(format === false && { format: false }),
      ...(cleanFirst === false && { cleanFirst: false }),
      ...baseOptions,
    },
  };

  // Update the project configuration with the release target
  updateProjectConfiguration(tree, normalizedOptions.projectName, project);

  const packageJsonSchematics: PackageDefinition = await readJSON(
    SCHEMATICS_PACKAGE_JSON_PATH,
  );

  const packages: Packages = {
    packageName: SCHEMATICS_TRACTR_PACKAGE_NAME,
    version: packageJsonSchematics.version,
  };

  // update the package.json dependencies
  await addPackageToPackageJson(tree, packages);

  installPackagesTask(tree, normalizedOptions);

  await formatFiles(tree);
}
