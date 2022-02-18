import path = require('path');

import {
  formatFiles,
  generateFiles,
  getWorkspaceLayout,
  readProjectConfiguration,
  Tree,
  updateProjectConfiguration,
} from '@nrwl/devkit';

import {
  addPackageToPackageJson,
  getImportPrefixPath,
  getNormalizedProjectDefaultsOptions,
  PackageType,
} from '../../helpers';
import hapifyLibraryGenerator from '../hapify-library/generator';
import { NX_TOOLS_NX_PRISMA_PACKAGE } from './constants/nx-tools-prisma-package';
import { getTargetsToAdd } from './helpers/project-targets';
import { PrismaLibraryGeneratorSchema } from './schema';

export interface NormalizedOptions {
  name: string;
  projectName: string;
  projectRoot: string;
  nodeModulesRelativePath: string;
  importPrefixPath: string;
  extra: Record<string, unknown>;
}

function normalizeOptions(
  tree: Tree,
  options: PrismaLibraryGeneratorSchema,
): NormalizedOptions {
  const { directory } = options;

  // Format case for user input
  const { name, projectRoot, projectName } =
    getNormalizedProjectDefaultsOptions(tree, {
      name: options.name,
      directory: options.directory,
    });

  const nodeModulesRelativePath = path.join(
    path.relative(`/${projectRoot}/prisma`, '/'),
    'node_modules',
    '.prisma',
    'client',
  );

  return {
    name,
    projectName,
    projectRoot,
    nodeModulesRelativePath,
    importPrefixPath: getImportPrefixPath(tree, directory),
    extra: options,
  };
}

function addFiles(host: Tree, options: NormalizedOptions) {
  generateFiles(host, path.join(__dirname, './files'), options.projectRoot, {
    ...options,
    template: '',
  });
}

export default async function prismaLibraryGenerator(
  tree: Tree,
  options: PrismaLibraryGeneratorSchema,
) {
  const normalizedOptions = normalizeOptions(tree, options);
  const { name, projectRoot, projectName, extra } = normalizedOptions;

  await hapifyLibraryGenerator(tree, {
    name,
    type: 'nest',
    hapifyTemplates: ['prisma'],
    hapifyAdditionalTemplates: '',
    hapifyModelsJson: 'hapify-models.json',
    hapifyUseImportReplacements: true,
    useSecondaryEndpoint: false,
    addSecondaryEndpoint: [],
    ...extra,
  });

  const targetsToAdd = getTargetsToAdd(projectRoot);
  const project = readProjectConfiguration(tree, projectName);
  project.targets = {
    ...project.targets,
    ...targetsToAdd,
  };
  updateProjectConfiguration(tree, projectName, project);

  addFiles(tree, normalizedOptions);

  await formatFiles(tree);

  await addPackageToPackageJson(tree, {
    packageName: NX_TOOLS_NX_PRISMA_PACKAGE,
  });

  await addPackageToPackageJson(tree, {
    packageName: '@prisma/client',
    type: PackageType.dependencies,
  });
}
