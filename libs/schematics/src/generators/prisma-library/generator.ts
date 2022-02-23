import path = require('path');

import {
  formatFiles,
  generateFiles,
  readProjectConfiguration,
  Tree,
  updateJson,
  updateProjectConfiguration,
} from '@nrwl/devkit';

import * as packageJson from '../../../package.json';
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
  directory: string;
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
  const { directory = '' } = options;

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
    directory,
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

  const { version } = packageJson;

  await addPackageToPackageJson(tree, [
    {
      packageName: '@prisma/client',
      type: PackageType.dependencies,
    },
    {
      packageName: '@tractr/nestjs-database',
      type: PackageType.dependencies,
      version,
    },
    {
      packageName: '@tractr/nestjs-core',
      type: PackageType.dependencies,
      version,
    },
    {
      packageName: '@nestjs/core',
      type: PackageType.dependencies,
    },
    {
      packageName: 'bcrypt',
      type: PackageType.dependencies,
    },
  ]);

  updateJson(tree, 'package.json', (json) => ({
    ...json,
    prisma: {
      ...json.prisma,
      seed: `ts-node -r tsconfig-paths/register --project ${projectRoot}/tsconfig.lib.json ${projectRoot}/prisma/seed.ts`,
      schema: `${projectRoot}/prisma/schema.prisma`,
    },
  }));
}
